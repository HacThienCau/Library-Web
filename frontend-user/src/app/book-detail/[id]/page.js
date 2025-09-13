"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LeftSideBar from "@/app/components/LeftSideBar";
import ChatBotButton from "@/app/components/ChatBotButton";
import { CheckCircle } from "lucide-react";
import { BsCartPlus } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import BookReview from "@/components/ui/bookreview";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import BookCarousel from "@/app/components/BookCarousel";


function page() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const userId = localStorage.getItem("id"); // Lấy userId từ localStorage
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const StatusIndicator = ({ available }) => {
    return (
      <div className="flex gap-1.5 justify-center items-center self-start rounded ">
        <span className="self-stretch my-auto font-normal">
          {available ? "Còn sẵn" : "Hết sách"}
        </span>
        <div className="self-stretch my-auto w-4">
          <div
            className={`flex shrink-0 w-4 h-4 ${
              available ? "bg-green-400" : "bg-[#F7302E]"
            } rounded-full`}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://library-backend.onrender.com/book/${id}`);
        const book = response.data;
        const convertedBook = {
          id: book.book_id,
          title: book.tenSach,
          author: book.tenTacGia,
          category: book.tenTheLoaiCon,
          publisher: book.nxb,
          status:
            book.tongSoLuong - book.soLuongMuon - book.soLuongXoa > 0
              ? "Còn sẵn"
              : "Hết sách",
          borrow_count: book.soLuongMuon,
          book_code: book.id,
          size: "14.5 x 20.5 cm",
          pages: book.soTrang,
          price: book.gia + " vnd",
          language: "Tiếng Việt",
          publish_year: book.nam,
          cover_image: book.hinhAnh,  //đây là mảng
          description: book.moTa,
        };
        setDetails(convertedBook);
      } catch (error) {
        console.error("Lỗi khi fetch sách:", error);
      }
    };

    fetchBook();
  }, []);

  useEffect(() => {
    const checkBookInCart = async () => {
      try {
        const res = await axios.get(`https://library-backend.onrender.com/carts/user/${userId}`);
        const cartBooks = res.data.books; // giả sử trả về mảng books [{ id: ..., ... }]
  
        const found = cartBooks.some(book => book.id === id); // id là id của sách hiện tại
        setIsAddedToCart(found);
      } catch (error) {
        console.error("Lỗi khi kiểm tra giỏ hàng:", error);
      }
    };
  
    checkBookInCart();
  }, [userId, id]);

  const handleAddToCart = async () => {
    try {
      const res = await axios.patch(
        `https://library-backend.onrender.com/carts/user/${userId}`,
        {
          books: [{ id: id }], // đưa vào mảng 1 phần tử
        }
      );

      // alert("Đã thêm sách vào giỏ!");
      toast.success("Đã thêm sách vào giỏ!");
      console.log(res.data);
      setIsAddedToCart(true); // Đánh dấu là đã thêm vào giỏ hàng

      // Reload lại trang để làm mới giỏ hàng
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi thêm sách vào giỏ:", error);
      alert("Có lỗi xảy ra khi thêm sách vào giỏ.");
    }
  };

  const handleBorrowBooks = async () => {
    try {
      const userId = localStorage.getItem("id"); // Lấy userId từ localStorage

      // Gửi yêu cầu đến backend để tạo phiếu mượn
      const response = await axios.post(
        "https://library-backend.onrender.com/borrow-card/create",
        {
          userId: userId,
          bookIds: [id],
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
    <div className="flex flex-col min-h-screen text-foreground">
      {details && <main className="pt-16 flex">      
        <section className="self-stretch px-[1.25rem] mx-30 my-auto w-full max-md:max-w-full mt-2 mb-2">
          <div className="flex flex-col p-6 bg-white rounded-xl shadow-md  md:flex-row gap-10">
          <BookCarousel images={details.cover_image}/>

            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-blue-900">
                {details.title}
              </h1>
              <div className="flex flex-col items-start gap-2 mt-2">
                <p>
                  <span className="font-semibold">Tác giả:</span>{" "}
                  {details.author}
                </p>
                <p>
                  <span className="font-semibold">Thể loại:</span>{" "}
                  {details.category}
                </p>
                <p>
                  <span className="font-semibold">NXB:</span>{" "}
                  {details.publisher}
                </p>
                <div className="flex items-center">
                  <div className="flex items-center gap-1 font-semibold">
                    <p>Trạng thái:</p>
                    <StatusIndicator available={details.status} />
                  </div>
                </div>
                <p>
                  <span className="font-semibold">Lượt mượn:</span>{" "}
                  {details.borrow_count} lượt
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Button
                  onClick={handleBorrowBooks}
                  className="mt-4 bg-[#062D76] hover:bg-[#E6EAF1] hover:text-[#062D76] text-white font-semibold py-2 px-4 rounded-lg cursor-pointer"
                >
                  Mượn ngay
                </Button>
                {/* <Button
                  onClick={handleAddToCart}
                  className="mt-4 bg-white hover:bg-[#E6EAF1] hover:text-[#062D76] text-[#062D76] font-semibold py-2 px-4 rounded-lg cursor-pointer border-2 border-[#062D76]"
                >
                  <BsCartPlus
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                    }}
                    className="size-6"
                  />
                  Thêm vào giỏ sách
                </Button> */}
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddedToCart}
                  className={`mt-4 font-semibold py-2 px-4 rounded-lg border-2 flex items-center gap-2
    ${
      isAddedToCart
        ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400"
        : "bg-white hover:bg-[#E6EAF1] hover:text-[#062D76] text-[#062D76] cursor-pointer border-[#062D76]"
    }`}
                >
                  <BsCartPlus
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    className="size-6"
                  />
                  {isAddedToCart ? "Đã thêm" : "Thêm vào giỏ sách"}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-2 p-6 bg-white rounded-xl shadow-md ">
            <h2 className="text-lg font-medium bg-[#E6EAF1] text-[#062D76] p-2 rounded-lg w-fit">
              Thông tin chi tiết
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <p>
                <span className="font-semibold">Mã sách:</span>{" "}
                {details.book_code}
              </p>
              <p>
                <span className="font-semibold">Kích thước:</span>{" "}
                {details.size}
              </p>
              <p>
                <span className="font-semibold">Số trang:</span> {details.pages}
              </p>
              <p>
                <span className="font-semibold">Giá:</span> {details.price}
              </p>
              <p>
                <span className="font-semibold">Năm xuất bản:</span>{" "}
                {details.publish_year}
              </p>
              <p>
                <span className="font-semibold">Ngôn ngữ:</span>{" "}
                {details.language}
              </p>
            </div>
          </div>

          <div className="mt-2 p-6 bg-white rounded-xl shadow-md mb-2">
            <h2 className="text-lg font-medium bg-[#E6EAF1] text-[#062D76] p-2 rounded-lg w-fit">
              Giới thiệu
            </h2>
            <p className="mt-2 text-gray-800 leading-relaxed">
              {details.description}
            </p>
          </div>

          <BookReview />
        </section>
        {/* <ChatBotButton /> */}
      </main>
}
    </div>
  );
}

export default page;
