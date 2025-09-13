"use server";
import OpenAI from "openai";
import {
  fetchBooksAndCategories,
  fetchBorrowCardsByUserId,
  fetchFAQS,
} from "./mongodb-actions";
import axios from "axios";

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
      latestMessage.includes("phiếu mượn của tôi") ||
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

    // Phát hiện người dùng muốn huỷ phiếu mượn
// if (latestMessage.includes("hủy phiếu mượn") || latestMessage.includes("xóa phiếu mượn")) {
//   const borrowCards = await fetchBorrowCardsByUserId(userId);
//   const requestCards = borrowCards.filter(c => c.status === "Đang yêu cầu");

//   if (requestCards.length === 0) {
//     return {
//       role: "assistant",
//       content: "Bạn không có phiếu mượn nào đang ở trạng thái 'Đang yêu cầu' để hủy.",
//     };
//   }

//   const list = requestCards
//     .map((card) => `• ID: \`${card._id}\` - gồm ${card.bookIds.length} sách`)
//     .join("\n");

//   return {
//     role: "assistant",
//     content:
//       "Đây là các phiếu mượn bạn có thể hủy. Vui lòng gửi lại ID phiếu mượn bạn muốn hủy:\n\n" + list,
//   };
// }
if (latestMessage.includes("hủy phiếu mượn") || latestMessage.includes("xóa phiếu mượn")) {
  const borrowCards = await fetchBorrowCardsByUserId(userId);
  const data = await fetchBooksAndCategories();
  const bookMap = new Map(data.books.map((b) => [b._id.toString(), b]));

  const requestCards = borrowCards.filter(c => c.status === "Đang yêu cầu");

  if (requestCards.length === 0) {
    return {
      role: "assistant",
      content: "✅ Hiện tại bạn không có phiếu mượn nào đang ở trạng thái 'Đang yêu cầu' để có thể hủy.",
    };
  }

  const list = requestCards
    .map((card) => {
      const bookList = card.bookIds
        .map(id => {
          const book = bookMap.get(id);
          return book ? `- ${book.tenSach} (${book.tenTacGia})` : null;
        })
        .filter(Boolean)
        .join("\n");

      return `📄 **Phiếu mượn ID:** \`${card._id}\`\nBao gồm sách:\n${bookList}`;
    })
    .join("\n\n---\n\n");

  return {
    role: "assistant",
    content:
      `🗑️ Đây là các phiếu mượn bạn có thể hủy (trạng thái: "Đang yêu cầu"):\n\n${list}\n\n**Vui lòng gửi lại ID phiếu mượn bạn muốn hủy.**`,
  };
}

// Nếu tin nhắn là một ID phiếu mượn
if (/^[a-f\d]{24}$/.test(latestMessage.trim())) {
  const borrowCards = await fetchBorrowCardsByUserId(userId);
  const cardToDelete = borrowCards.find(
    (c) =>
      c._id?.toString?.() === latestMessage.trim() &&
      c.status === "Đang yêu cầu"
  );

  if (cardToDelete) {
    try {
      await axios.delete(`https://library-backend-ydnf.onrender.com/borrow-card/${cardToDelete._id}`);
      return {
        role: "assistant",
        content: `✅ Đã hủy thành công phiếu mượn có ID: \`${cardToDelete._id}\`.`,
      };
    } catch (error) {
      return {
        role: "assistant",
        content: `❌ Không thể hủy phiếu mượn. Lỗi: ${error?.response?.data || "Không rõ"}`,
      };
    }
  }
}


// 4.1 Nếu người dùng muốn mượn sách
if (
  latestMessage.includes("đăng ký mượn") ||
  latestMessage.includes("muốn mượn") || 
  latestMessage.includes("tôi muốn mượn sách") ||
  latestMessage.includes("tạo phiếu mượn")
) {
  const matchedBooks = data.books.filter((book) =>
    latestMessage.includes(book.tenSach.toLowerCase())
  );

  if (matchedBooks.length === 0) {
    return {
      role: "assistant",
      content: "❌ Mình không tìm thấy tên sách nào khớp trong yêu cầu của bạn. Vui lòng viết rõ tên sách bạn muốn mượn nhé!",
    };
  }

  const bookIds = matchedBooks.map((b) => b._id);
  try {
    const response = await axios.post("https://library-backend-ydnf.onrender.com/borrow-card/create", {
      userId,
      bookIds,
    });

    return {
      role: "assistant",
      content: `✅ Đã tạo phiếu mượn thành công cho các sách:\n${matchedBooks
        .map((b) => `• ${b.tenSach} (${b.tenTacGia})`)
        .join("\n")}\n\n Bạn vui lòng đến thư viện nhận sách sớm nhất nhé!`,
    };
  } catch (error) {
    return {
      role: "assistant",
      content: `❌ Không thể tạo phiếu mượn. Lỗi: ${error?.response?.data || "Không rõ nguyên nhân"}`,
    };
  }
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
