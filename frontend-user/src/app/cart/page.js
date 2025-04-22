"use client";
import React, { useState, useEffect } from "react";
import LeftSideBar from "../components/LeftSideBar";
import ChatBotButton from "../components/ChatBotButton";
import BookCard from "./book";
import axios from "axios";
// const books = [
//   {
//     id: "DRPN001",
//     imageSrc:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/9b777cb3ef9abb920d086e97e27ac4f6f3559695",
//     available: true,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     id: "DRPN002",
//     imageSrc:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/fc01b7cf44e0ca2f23258dcc0ad69329b2612af0?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: false,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     id: "DRPN003",
//     imageSrc:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/5e8a0f3fd4681a9512313c2c1c6dae1285bcf0a6?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: true,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     id: "DRPN004",
//     imageSrc:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/d854294877ea4263cf3494a98eecfd64cd148327?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: false,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     id: "DRPN005",
//     imageSrc:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/acf848c9260bfc86d1f9094e17e14ec25f3ec193?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: true,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     id: "DRPN006",
//     imageSrc:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/d854294877ea4263cf3494a98eecfd64cd148327?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: false,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
// ];

const page = () => {
  const [selected, setSelected] = useState([]);
  const [books, setBooks] = useState(""); // Giỏ hàng
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const userId = localStorage.id; // Thay bằng userId thực tế của bạn
  let cartId = "";

  // Lấy giỏ hàng từ API theo userId
  const fetchCart = async () => {
    try {
      setLoading(true); // Bắt đầu tải dữ liệu
      const response = await fetch(
        `http://localhost:8081/carts/user/${userId}`
      ); // Endpoint API lấy giỏ hàng theo userId
      if (response.ok) {
        const data = await response.json();
        cartId = data.id;
        setBooks(data.books); // Giả sử API trả về đối tượng có key 'books'
      } else {
        console.error("Lỗi khi lấy giỏ hàng");
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
  const toggleBook = (bookId, checked) => {
    setSelected((prev) =>
      checked ? [...prev, bookId] : prev.filter((id) => id !== bookId)
    );
  };

  // tick / bỏ tick tất cả
  const allChecked =
    Array.isArray(books) &&
    books.length > 0 &&
    selected.length === books.length;
  const toggleAll = (checked) =>
    setSelected(checked ? books.map((book) => book.id) : []);

  const handleDeleteBooks = async () => {
    try {
      // Gửi request xóa các sách đã chọn, dùng `selected` để lấy các book ID
      const response = await axios.delete(
        `http://localhost:8081/carts/user/${userId}`,
        {
          data: selected, // Truyền danh sách các ID sách cần xóa
        }
      );

      // Cập nhật lại giỏ hàng sau khi xóa
      setBooks(response.data.books);
      console.log("Giỏ hàng sau khi xóa:", response);
      // Thông báo thành công
      alert("Đã xóa sách thành công!");
      setSelected([]); // Reset danh sách đã chọn
    } catch (error) {
      console.error("Lỗi khi xóa sách:", error);
      alert("Đã có lỗi khi xóa sách!");
    }
  };

  const handleBorrowBooks = async () => {
    try {
      // Gửi request xóa các sách đã chọn, dùng `selected` để lấy các book ID
      // const response = await axios.delete(
      //   `http://localhost:8081/carts/user/${userId}`,
      //   {
      //     data: selected, // Truyền danh sách các ID sách cần xóa
      //   }
      // );

      // Cập nhật lại giỏ hàng sau khi xóa
      // setBooks(response.data.books);
      console.log("Danh sách id sách muốn mượn:", selected);
      // Thông báo thành công
      alert("Đã xóa sách thành công!");
      setSelected([]); // Reset danh sách đã chọn
    } catch (error) {
      console.error("Lỗi khi xóa sách:", error);
      alert("Đã có lỗi khi xóa sách!");
    }
  }; 

  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <main className="pt-16 flex">
        <LeftSideBar />
        <section className="self-stretch pr-[1.25rem] md:pl-60 ml-[1.25rem] my-auto w-full max-md:max-w-full mt-2">
          <div className="flex flex-col p-5 w-full bg-white rounded-xl max-md:max-w-full">
            <div className="flex items-center justify-center gap-3">
              <h2 className="gap-2.5 self-center px-[1.25rem] py-[0.625rem] text-[1.5rem] text-[#062D76] font-semibold rounded-lg">
                Giỏ sách
              </h2>
            </div>
            <div className="grid grid-cols-1 max-sm:grid-cols-1 gap-5 items-start mt-5 w-full max-md:max-w-full">
              {Array.isArray(books) &&
                books.map((book, index) => (
                  <BookCard
                    key={book.id}
                    id={book.id}
                    imageSrc={book.hinhAnh[0]}
                    available={
                      book.tongSoLuong - book.soLuongMuon - book.soLuongXoa > 0
                        ? "Còn sẵn"
                        : "Hết sách"
                    }
                    title={book.tenSach}
                    author={book.tenTacGia}
                    publisher={book.nxb}
                    borrowCount={book.soLuongMuon}
                    checked={selected.includes(book.id)} // Kiểm tra nếu ID sách đã được chọn
                    onCheck={(checked) => toggleBook(book.id, checked)} // Truyền ID sách thay vì chỉ số
                  />
                ))}
            </div>
          </div>
          {selected.length > 0 && (
            <footer className="fixed bottom-0 self-stretch mr-[1.25rem] md:left-64 ml-[1.25rem] right-0 bg-[#E6EAF1] shadow-lg p-4 flex justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-[#F7302E] cursor-pointer"
                  checked={allChecked}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
                <span className="text-sm font-medium text-[#062D76]">
                  Chọn tất cả ({books.length})
                </span>
              </div>

              <button
                onClick={handleDeleteBooks}
                className="px-4 py-2 bg-[#F44336] text-white rounded"
              >
                Xóa sách ({selected.length})
              </button>

              <button 
              onClick={handleBorrowBooks}
              className="px-4 py-2 bg-[#062D76] text-white rounded">
                Đăng ký mượn ({selected.length})
              </button>
            </footer>
          )}
        </section>
      </main>
    </div>
  );
};

export default page;
