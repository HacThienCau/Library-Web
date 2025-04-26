"use client";
import React, { useState, useEffect } from "react";
import LeftSideBar from "../components/LeftSideBar";
import ChatBotButton from "../components/ChatBotButton";
import BookCard from "./book";

const page = () => {
  const [selected, setSelected] = useState([]);
  const [noti, setNoti] = useState("");
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const userId = localStorage.getItem("id");
  console.log(userId);
  // Lấy giỏ hàng từ API theo userId
  const fetchCart = async () => {
    try {
      setLoading(true); // Bắt đầu tải dữ liệu
      const response = await fetch(
        `http://localhost:8081/notification/${userId}`
      ); // Endpoint API lấy giỏ hàng theo userId
      if (response.ok) {
        const data = await response.json();
        setNoti(data);
      } else {
        console.error("Lỗi khi lấy thông báo");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    } finally {
      setLoading(false); // Hoàn tất việc gọi API
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  // tick / bỏ tick 1 cuốn
  const toggleBook = (idx, checked) => {
    setSelected((prev) =>
      checked ? [...prev, idx] : prev.filter((i) => i !== idx)
    );
  };

  // tick / bỏ tick tất cả
  const allChecked = selected.length === noti.length;
  const toggleAll = (checked) =>
    setSelected(checked ? noti.map((_, i) => i) : []);
  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <main className="pt-16 flex">
        <LeftSideBar />
        <section className="self-stretch pr-[1.25rem] md:pl-60 ml-[1.25rem] my-auto w-full max-md:max-w-full mt-2 mb-2">
          <div className="flex flex-col p-5 w-full bg-white rounded-xl max-md:max-w-full">
            <div className="flex items-center justify-center gap-3">
              <h2 className="gap-2.5 self-center px-[1.25rem] py-[0.625rem] text-[1.5rem] text-[#062D76] font-semibold rounded-lg">
                Thông báo
              </h2>
            </div>
            <div className="grid grid-cols-1 max-sm:grid-cols-1 gap-5 items-start mt-5 w-full max-md:max-w-full">
              {Array.isArray(noti) &&
                noti.map((book, index) => (
                  <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.message}
                    checked={selected.includes(index)}
                    onCheck={(c) => toggleBook(index, c)}
                  />
                ))}
            </div>
          </div>
          {selected.length > 0 && (
            <footer className="fixed bottom-0 self-stretch mr-[1.25rem] md:left-60 ml-[1.25rem] right-0 bg-[#E6EAF1] shadow-lg p-4 flex justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-[#F7302E] cursor-pointer"
                  checked={allChecked}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
                <span className="text-sm font-medium text-[#062D76]">
                  Chọn tất cả ({noti.length})
                </span>
              </div>
              <button className="px-4 py-2 bg-[#062D76] text-white rounded cursor-pointer hover:bg-[#F7302E] transition duration-200 ease-in-out">
                Đăng ký mượn ({selected.length})
              </button>
            </footer>
          )}
        </section>
        <ChatBotButton />
      </main>
    </div>
  );
};

export default page;
