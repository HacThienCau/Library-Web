"use server";
import OpenAI from "openai";
import { fetchFAQS } from "./mongodb-actions";





const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Chat Completion
 * @param {Array} chatMessages - Array of message objects
 * @returns {Promise} - Returns a message object
 */
export async function chatCompletion(chatMessages) {
  try {
    console.log("FROM BACKEND", chatMessages);

    // Fetch FAQS from DB
    const document = await fetchFAQS();

    if (!document) {
      throw new Error("Error fetching FAQS");
    }

    // Check if the user question is in the FAQ array
    const faqsAnswer = document.faqs.find((faq) =>
      chatMessages
        .at(-1)
        ?.content.toLowerCase()
        .includes(faq.question.toLowerCase())
    );

    if (faqsAnswer) {
      console.log(faqsAnswer);
      return { role: "assistant", content: faqsAnswer.answer };
    }

    console.log(`Reaching out to OPENAI API...`);

    // Chat to be sent to OPEN AI
    const chat = [
      { role: "system", content:  "Bạn là một trợ lý hỏi đáp thông minh của ReadHub. Dưới đây là một số câu hỏi thường gặp và câu trả lời tương ứng. Nếu người dùng hỏi điều gì tương tự, hãy trả lời dựa trên những gì có sẵn. Nếu không có thông tin, hãy trả lời theo hiểu biết của bạn." },
      ...document.faqs.map((faq) => ({
        role: "system",
        content: `Q: ${faq.question}\nA: ${faq.answer}`,
      })),
      ...chatMessages,
    ];

    // Response
    const completion = await openAI.chat.completions.create({
      messages: chat as OpenAI.Chat.ChatCompletionMessageParam[], 
      model: "gpt-4o-mini",
    });

    if (!completion) {
      throw new Error("Invalid response from OPENAI API!");
    }

    // Bot/Assistant Message
    const assistantMessage = completion.choices[0].message?.content;

    if (!assistantMessage) {
      throw new Error("No message from OPENAI API");
    }

    console.log("COMPLETION", completion.choices[0].message.content);
    return { role: "assistant", content: assistantMessage };
  } catch (error) {
    console.log(error);
    return {
      role: "assistant",
      content: "Có lỗi xảy ra.Vui lòng thử lại sau.",
    };
  }
}