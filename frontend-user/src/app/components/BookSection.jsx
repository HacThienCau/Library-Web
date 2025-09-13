"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart } from "lucide-react"; // dùng icon từ lucide-react (hoặc FontAwesome tuỳ bạn)
import Link from "next/link";
import axios from "axios";

export default function BookSection({ title, books, slug }) {
  const router = useRouter();
  const userId = localStorage.getItem("id");
  // console.log("BookSection rendered with books:", books);
  const handleCardClick = (book) => {
    console.log("Xem chi tiết sách:", book.id);
    router.push(`/book-detail/${book.id}`);
  };

  const handleAddToCart = async (book) => {
    try {
      const res = await axios.patch(
        `https://library-backend.onrender.com/carts/user/${userId}`,
        {
          books: [{ id: book.id }], // đưa vào mảng 1 phần tử
        }
      );

      alert("Đã thêm sách vào giỏ!");
      // console.log(res.data);
      // setIsAddedToCart(true); // Đánh dấu là đã thêm vào giỏ hàng

      // Reload lại trang để làm mới giỏ hàng
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi thêm sách vào giỏ:", error);
      alert("Có lỗi xảy ra khi thêm sách vào giỏ.");
    }
  };

  const handleBorrowBooks = async (book) => {
    try {
      const userId = localStorage.getItem("id"); // Lấy userId từ localStorage

      // Gửi yêu cầu đến backend để tạo phiếu mượn
      const response = await axios.post(
        "https://library-backend.onrender.com/borrow-card/create",
        {
          userId: userId,
          bookIds: [book.id],
        }
      );

      if (response.status === 200) {
        alert("Phiếu mượn đã được tạo!");
        console.log(response.data); // Xem chi tiết phiếu mượn
        window.location.href = "/borrowed-card";
      } else {
        alert("Không thể tạo phiếu mượn");
      }
    } catch (error) {
      console.error("Lỗi khi mượn sách:", error);
      alert("Có lỗi xảy ra khi mượn sách.");
    }
  };

  return (
    <section className="bg-white my-6 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
      <div className="flex overflow-x-auto gap-8 pb-3">
        {books.map((book, idx) => (
          <div
            key={idx}
            className="relative group rounded-lg p-3 shadow hover:shadow-md transition"
          >
            <div
              onClick={() => handleCardClick(book)}
              className="relative overflow-hidden rounded h-[180px] w-[150px] flex justify-center group cursor-pointer"
            >
              <img
                src={book.hinhAnh?.[0]}
                alt={book.title || book.tenSach}
                className="rounded object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />

              {/* Các nút hover nằm trên ảnh */}
              <div className="absolute inset-0 flex items-end justify-center gap-2 pb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(book);
                  }}
                  className="bg-gray-100 px-2 py-2 rounded shadow hover:bg-[#062D76] text-sky-900 hover:text-white transition"
                >
                  <ShoppingCart size={18} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBorrowBooks(book);
                  }}
                  className="bg-[#062D76] text-white font-semibold px-3 py-2 text-sm rounded hover:bg-gray-100 hover:text-sky-900 transition"
                >
                  Mượn ngay
                </button>
              </div>
            </div>

            <h3 className="text-sm font-medium truncate mt-2">{book.title}</h3>
            <p className="text-xs text-yellow-500">
              {"★".repeat(book.rating || 4)}
            </p>
            <p className="text-green-600 text-sm font-semibold">
              ● {book.trangThai === "CON_SAN" ? "Còn sẵn" : "Đã hết"}
            </p>
          </div>
        ))}
      </div>
      <div className="text-right mt-2">
        <button
          className="text-blue-600 text-sm hover:underline"
          onClick={() => router.push(`/collections/${slug}`)}
        >
          Xem thêm &gt;&gt;
        </button>
      </div>
    </section>
  );
}
