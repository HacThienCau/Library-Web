"use server";
import OpenAI from "openai";
import {
  fetchBooksAndCategories,
  fetchBorrowCardsByUserId,
  fetchFAQS,
} from "./mongodb-actions";

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function chatCompletion(chatMessages, userId) {
  try {
    const latestMessage = chatMessages.at(-1)?.content.toLowerCase() || "";

    // 1. FAQs
    const document = await fetchFAQS();
    const faqsAnswer = document?.faqs.find((faq) =>
      latestMessage.includes(faq.question.toLowerCase())
    );
    if (faqsAnswer) return { role: "assistant", content: faqsAnswer.answer };

    // 2. Gợi ý sách
    const data = await fetchBooksAndCategories();
    if (
      latestMessage.includes("gợi ý sách") ||
      latestMessage.includes("có gì")
    ) {
      const suggestions = data.books
        .slice(0, 5)
        .map((b) => {
          const img =
            Array.isArray(b.hinhAnh) && b.hinhAnh.length > 0
              ? `\n![Ảnh bìa](${b.hinhAnh[0]})`
              : "";
          // return `• **${b.tenSach}** - _${b.tenTacGia}_${img}`;
          return `• **${b.tenSach}** - _${b.tenTacGia}_\n\n![Ảnh bìa](${b.hinhAnh[0]})`;
        })
        .join("\n");

      return {
        role: "assistant",
        content: `Dưới đây là một số sách bạn có thể thích:\n${suggestions}`,
      };
    }

    // 3. Gợi ý theo thể loại
    if (
      latestMessage.includes("có thể loại gì") ||
      latestMessage.includes("có các loại sách nào")
    ) {
      const uniqueGenres = Array.from(
        new Set(data.books.map((b) => b.tenTheLoai))
      );
      return {
        role: "assistant",
        content:
          "Dưới đây là các thể loại bạn có thể quan tâm:\n" +
          uniqueGenres.map((g) => `• ${g}`).join("\n"),
      };
    }

    // 3.1 Gợi ý theo tên thể loại cụ thể (so khớp chuỗi)
    const lowerMsg = latestMessage.toLowerCase();
    const matchedGenre = data.books.find((b) =>
      lowerMsg.includes(b.tenTheLoai.toLowerCase())
    )?.tenTheLoai;

    if (matchedGenre) {
      const matchingBooks = data.books.filter(
        (b) => b.tenTheLoai === matchedGenre
      );

      const suggestions = matchingBooks
        .slice(0, 5)
        .map((b) => {
          const img =
            Array.isArray(b.hinhAnh) && b.hinhAnh.length > 0
          //     ? `\n![Ảnh bìa](${b.hinhAnh[0]})`
          //     : "";
          // return `• **${b.tenSach}** - _${b.tenTacGia}_${img}`;
           ? `\n![Ảnh bìa](${b.hinhAnh[0]})`
              : "";
          // return `• **${b.tenSach}** - _${b.tenTacGia}_${img}`;
          return `• **${b.tenSach}** - _${b.tenTacGia}_\n\n![Ảnh bìa](${b.hinhAnh[0]})`;
        })
        .join("\n");

      return {
        role: "assistant",
        content: `Một số sách thuộc thể loại **"${matchedGenre}"**:\n${suggestions}`,
      };
    }
    // 4. Phiếu mượn
    if (
      latestMessage.includes("phiếu mượn") ||
      latestMessage.includes("có mượn sách gì không") ||
      latestMessage.includes("đang mượn sách gì")
    ) {
      const borrowCards = await fetchBorrowCardsByUserId(userId);
      if (!borrowCards.length) {
        return {
          role: "assistant",
          content: "Bạn chưa có phiếu mượn nào.",
        };
      }

      // Gộp thông tin sách vào phiếu mượn
      const bookMap = new Map(data.books.map((b) => [b._id.toString(), b]));
      const enriched = borrowCards.map((card) => {
        const borrowedBooks = card.bookIds
          .map((id) => {
            const book = bookMap.get(id);
            if (!book) return null;
            return `- ${book.tenSach} - ${book.tenTacGia}`;
          })
          .filter(Boolean)
          .join("\n");

        return `**Phiếu mượn ID:** \`${card._id}\`\n\n**Sách đã mượn:**\n\n${borrowedBooks}\n\n**→ Trạng thái:** ${card.status}`;
      });

      return {
        role: "assistant",
        content: `Đây là danh sách sách bạn đã mượn:\n\n${enriched.join(
          "\n\n---\n\n"
        )}`,
      };
    }

    // 5. Fallback gửi lên OpenAI nếu không khớp
    const borrowCards = await fetchBorrowCardsByUserId(userId);
    const bookMap = new Map(data.books.map((b) => [b._id.toString(), b]));

    const chat = [
      {
        role: "system",
        content: `Bạn là trợ lý thông minh của ReadHub. Dưới đây là dữ liệu hiện có để giúp bạn trả lời:
- Một số câu hỏi thường gặp (FAQ)
- Danh sách sách & thể loại
- Danh sách phiếu mượn của người dùng (nếu có)

Hãy dựa trên những dữ liệu sau để trả lời tự nhiên và chính xác.`,
      },
      ...(document?.faqs.map((faq) => ({
        role: "system",
        content: `FAQ - Q: ${faq.question} | A: ${faq.answer}`,
      })) || []),
      ...(data?.books.map((book) => {
        const img =
          Array.isArray(book.hinhAnh) && book.hinhAnh.length > 0
            ? `\nẢnh bìa: ![Ảnh bìa](${book.hinhAnh[0]})`
            : "";

        return {
          role: "system",
          content: `Sách: ${book.tenSach}, Thể loại: ${book.tenTheLoai}, Tác giả: ${book.tenTacGia}, Mô tả: ${book.moTa}${img}`,
        };
      }) || []),
      ...(borrowCards
        .flatMap((card) =>
          card.bookIds.map((id) => {
            const book = bookMap.get(id);
            if (!book) return null;
            return {
              role: "system",
              content: `Phiếu mượn: Sách "${book.tenSach}", Tác giả: ${book.tenTacGia}, Trạng thái: ${card.status}`,
            };
          })
        )
        .filter(Boolean) || []),
      ...chatMessages,
    ];

    const completion = await openAI.chat.completions.create({
      messages: chat,
      model: "gpt-4o-mini",
    });

    const assistantMessage = completion.choices[0].message?.content;
    return {
      role: "assistant",
      content: assistantMessage || "Xin lỗi, tôi không hiểu câu hỏi.",
    };
  } catch (error) {
    console.error(error);
    return {
      role: "assistant",
      content: "Có lỗi xảy ra. Vui lòng thử lại sau.",
    };
  }
}
