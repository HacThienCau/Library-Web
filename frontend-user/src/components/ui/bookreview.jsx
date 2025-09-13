// 'use client';

// import React from 'react';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { Star, Check, MessageCircle } from 'lucide-react';

// function BookReview() {
//   const handleWriteReview = () => {
//     // Logic to handle writing a review

//     console.log('Write a review clicked');
//   };
//   return (
//     <div className="border rounded-md p-4 space-y-4 bg-white shadow-sm">
//       <Tabs defaultValue="review">
//         <TabsList className="flex space-x-2 border-b ">
//           <TabsTrigger value="review" className="cursor-pointer">Đánh giá</TabsTrigger>
//           <TabsTrigger value="question" className="cursor-pointer">Câu hỏi & Trả lời</TabsTrigger>
//         </TabsList>

//         {/* Tab Đánh Giá */}
//         <TabsContent value="review" className="mt-4">
//           <p className="font-bold text-xl">Đánh giá</p>
//           <div className="flex gap-1 text-yellow-400">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} size={20} className="stroke-current" fill="none" />
//             ))}
//           </div>
//           <p className="text-sm text-gray-500 mt-1">Dựa trên 0 đánh giá</p>

//           <hr className="border-t my-4" />

//           <button
//             className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
//             onClick={handleWriteReview}
//             >
//             <Check className="w-5 h-5 text-green-500" />
//             <span>Viết đánh giá</span>
//           </button>
//         </TabsContent>

//         {/* Tab Câu Hỏi & Trả Lời */}
//         <TabsContent value="question" className="mt-4">
//           <p className="font-bold text-xl">Câu hỏi & Trả lời</p>
//           <p className="text-gray-500">Hiện chưa có câu hỏi nào.</p>

//           <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 mt-4">
//             <MessageCircle className="w-5 h-5 text-blue-500" />
//             <span>Đặt câu hỏi</span>
//           </button>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// export default BookReview;
"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";

function BookReview() {
  const [reviews, setReviews] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [questionInput, setQuestionInput] = useState("");
  const { id: bookId } = useParams();
  const currentUserId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

  const fetchUserInfo = async (userId) => {
    try {
      if (!usersMap[userId]) {
        const res = await fetch(`https://library-backend-ydnf.onrender.com/user/${userId}`);
        const data = await res.json();
        setUsersMap((prev) => ({ ...prev, [userId]: data }));
      }
    } catch (err) {
      console.error("Lỗi lấy thông tin user:", err);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://library-backend-ydnf.onrender.com/reviews/book/${bookId}`);
      const data = await res.json();
      setReviews(data);

      // Fetch tất cả user tương ứng
      const uniqueUserIds = [...new Set(data.map((r) => r.userId))];
      await Promise.all(uniqueUserIds.map(fetchUserInfo));
    } catch (error) {
      console.error("Lỗi tải đánh giá:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await fetch(`https://library-backend-ydnf.onrender.com/questions/book/${bookId}`);
      const data = await res.json();
      setQuestions(data);

      const uniqueUserIds = [...new Set(data.map((r) => r.userId))];
      await Promise.all(uniqueUserIds.map(fetchUserInfo));
    } catch (error) {
      console.error("Lỗi khi tải câu hỏi:", error);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchReviews();
      fetchQuestions();
    }
  }, [bookId]);

  const handleSubmit = async () => {
    const payload = { bookId, userId: currentUserId, comment, rating };
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing
        ? `https://library-backend-ydnf.onrender.com/reviews/${editing.id}`
        : `https://library-backend-ydnf.onrender.com/reviews`;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setEditing(null);
      setComment("");
      setRating(5);
      fetchReviews();
    } catch (err) {
      console.error("Lỗi gửi đánh giá", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa đánh giá này?")) {
      await fetch(`https://library-backend-ydnf.onrender.com/reviews/${id}`, { method: "DELETE" });
      fetchReviews();
    }
  };

  const handleEdit = (review) => {
    setEditing(review);
    setComment(review.comment);
    setRating(review.rating);
  };

  const calculateAverage = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const handleSubmitQuestion = async () => {
    if (!questionInput.trim()) return;

    const payload = {
      bookId,
      userId: currentUserId,
      question: questionInput.trim(),
    };

    try {
      await fetch("https://library-backend-ydnf.onrender.com/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setQuestionInput("");
      fetchQuestions(); // Refresh danh sách sau khi gửi
    } catch (error) {
      console.error("Lỗi khi gửi câu hỏi:", error);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Vừa xong";
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="border rounded-md p-4 space-y-4 bg-white shadow-sm">
      <Tabs defaultValue="review">
        <TabsList className="flex space-x-2 border-b">
          <TabsTrigger value="review" className="cursor-pointer">Đánh giá</TabsTrigger>
          <TabsTrigger value="question" className="cursor-pointer">Câu hỏi & Trả lời</TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="mt-4">
          <p className="font-bold text-xl mb-2">Đánh giá</p>

          {loading ? (
            <p className="text-gray-500 text-sm">Đang tải đánh giá...</p>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="text-yellow-400 flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i <= Math.round(calculateAverage())
                          ? "fill-current"
                          : ""
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {calculateAverage()} sao trung bình • {reviews.length} đánh
                  giá
                </span>
              </div>

              <hr className="my-4" />

              {/* <div className="space-y-4">
                {reviews.map((review) => {
                  const user = usersMap[review.userId] || {};
                  return (
                    <div
                      key={review.id}
                      className="border p-4 rounded-md bg-gray-50 shadow-sm relative"
                    >
                      <div className="flex justify-between">
                        <div className="flex gap-3">
                          <img
                            src={user.avatarUrl || "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482760jWL/anh-mo-ta.png"}
                            alt="avatar"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold">{user.tenND || "Người dùng ẩn danh"}</p>
                            <div className="flex gap-1 text-yellow-400">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={16} className="fill-current" />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                          </div>
                        </div>

                        {review.userId === currentUserId && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(review)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(review.id)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div> */}
              <div className="space-y-4">
                {reviews.map((review) => {
                  const user = usersMap[review.userId] || {};

                  return (
                    <div
                      key={review.id}
                      className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                    >
                      {/* Nút edit/delete */}
                      {review.userId === currentUserId && (
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <button
                            onClick={() => handleEdit(review)}
                            className="p-1 rounded hover:bg-gray-100"
                            title="Chỉnh sửa"
                          >
                            <Pencil size={16} className="text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(review.id)}
                            className="p-1 rounded hover:bg-gray-100"
                            title="Xoá"
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </button>
                        </div>
                      )}

                      {/* Header: Avatar + Tên + Sao */}
                      <div className="flex items-center space-x-4">
                        <img
                          src={
                            user.avatarUrl ||
                            "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482760jWL/anh-mo-ta.png"
                          }
                          alt="avatar"
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                        <div>
                          <p className="text-base font-semibold text-gray-800">
                            {user.tenND || "Người dùng ẩn danh"}
                          </p>
                          <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                size={18}
                                className={
                                  i <= review.rating
                                    ? "fill-current"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bình luận */}
                      <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Form đánh giá */}
              <div className="mt-6 space-y-2">
                <p className="font-medium">
                  {editing ? "Chỉnh sửa đánh giá" : "Viết đánh giá mới"}
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star
                      key={num}
                      size={24}
                      className={`cursor-pointer ${
                        rating >= num ? "fill-yellow-400 text-yellow-400" : ""
                      }`}
                      onClick={() => setRating(num)}
                    />
                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border rounded p-2 text-sm"
                  placeholder="Viết cảm nhận của bạn..."
                />
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                >
                  {editing ? "Cập nhật" : "Gửi đánh giá"}
                </button>
                {editing && (
                  <button
                    onClick={() => {
                      setEditing(null);
                      setComment("");
                      setRating(5);
                    }}
                    className="ml-2 px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Hủy
                  </button>
                )}
              </div>
            </>
          )}
        </TabsContent>

        {/* Tab hỏi đáp */}
        {/* <TabsContent value="question" className="mt-4">
          <p className="font-bold text-xl">Câu hỏi & Trả lời</p>
          <p className="text-gray-500">Hiện chưa có câu hỏi nào.</p>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 mt-4">
            <MessageCircle className="w-5 h-5 text-blue-500" />
            <span>Đặt câu hỏi</span>
          </button>
        </TabsContent> */}
        <TabsContent value="question" className="mt-4">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">
              Câu hỏi & Trả lời
            </h2>

            {/* Nếu không có câu hỏi */}
            {questions.length === 0 ? (
              <p className="text-sm text-gray-500">Hiện chưa có câu hỏi nào.</p>
            ) : (
              <div className="space-y-4">
                {questions?.map((q) => {
                  const user = usersMap[q.userId] || {};
                  return (
                    <div
                      key={q.id}
                      className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                    >
                      {/* Header: Avatar + Tên */}
                      <div className="flex items-center space-x-4">
                        <img
                          src={
                            user.avatarUrl ||
                            "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482760jWL/anh-mo-ta.png"
                          }
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                        <div>
                          <p className="text-base font-semibold text-gray-800">
                            {user.tenND || "Người dùng ẩn danh"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(q.createdAt) || "Vừa xong"}
                          </p>
                        </div>
                      </div>

                      {/* Nội dung câu hỏi */}
                      <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                        {q.question}
                      </p>

                      {/* Nếu có trả lời */}
                      {q.answer && (
                        <div className="mt-4 border-l-4 border-blue-500 pl-4 bg-blue-50 text-sm text-gray-800">
                          <p className="font-medium">Phản hồi từ thư viện:</p>
                          <p>{q.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Form đặt câu hỏi */}
            <div className="mt-6 space-y-2 border-t pt-4">
              <p className="font-medium text-gray-800">Đặt câu hỏi của bạn</p>
              <textarea
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                placeholder="Bạn muốn biết điều gì về sản phẩm này?"
                className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
              />
              <button
                onClick={handleSubmitQuestion}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="cursor-pointer">Gửi câu hỏi</span>
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default BookReview;
