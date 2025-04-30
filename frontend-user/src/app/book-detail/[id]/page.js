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

const detail = {
  id: "DRPN001",
  title: "Đất rừng phương Nam",
  author: "Đoàn Giỏi",
  category: "Tiểu thuyết",
  publisher: "Nhà xuất bản Kim Đồng",
  status: "Còn sẵn",
  borrow_count: 79,
  book_code: "DRPN001",
  size: "14.5 x 20.5 cm",
  pages: 340,
  isbn: "978-604-2-18920-5",
  language: "Tiếng Việt",
  publish_year: 1986,
  cover_image:
    "https://product.hstatic.net/200000343865/product/-nam_532d0fa40aab482f85159ed6a3b654ea_1edd78cb1d744015ac3fe61c1e9300e1_f5ee225e7b5f4b3bb15d2bdfd93dd907_master.jpg",
  description: `Sau thành công của cuốn sách đầu tay “Phải lòng với cô đơn” chàng họa sĩ nổi tiếng và tài năng Kulzsc đã trở lại với một cuốn sách vô cùng đặc biệt mang tên: "Tô bình yên - vẽ hạnh phúc” – sắc nét phong cách cá nhân với một chút “thơ thẩn, rất hiền”.
Không giống với những cuốn sách chỉ để đọc, “Tô bình yên – vẽ hạnh phúc” là một cuốn sách mà độc giả vừa tìm được “Hạnh phúc to to từ những điều nho nhỏ” vừa được thực hành ngay lập tức. Một sự kết hợp mới lạ đầy thú vị giữa thể loại sách tản văn và sách tô màu. Lật mở cuốn sách này, bạn sẽ thấy vô vàn những điều nhỏ bé dễ thương lan tòa nguồn năng lượng tích cực. Và kèm theo một list những điều tuyệt vời khiến bạn không thể bỏ lỡ:
- Tận tình chỉ dẫn: 8 hướng dẫn tô màu đầy hứng thú từ Kulzsc
- Tranh vẽ đơn giản, gần gũi. Nét vẽ đáng yêu, dễ thương
- Chủ đề xoay quanh những điều bình yên trong cuộc sống: Đọc sách, đi dạo, dọn dẹp nhà cửa, trồng cây, ăn cơm mẹ nấu, nghe một bản nhạc hay, và nghĩ về nụ cười của một ai đó…
- Mỗi bức tranh lại là những lời thủ thỉ, tâm tình của tác giả. Là những điều nhắn gửi nho nhỏ mong bạn bớt đi những xao động:
“Em chọn hạnh phúc
Em chọn bình yên
Em chọn bên cạnh
Những điều an yên”
Hay đơn giản là những giãi bày ngắn gọn, thay nỗi lòng của một ai đó: "Tớ biết cậu một mình vẫn ổn, nhưng có những chuyện, có ai đó cùng làm, vẫn hơn."
Thông qua những hình vẽ đang đợi được lấp đầy bằng muôn vàn sắc màu ấy, Kulzsc sẽ giúp bạn - những người lớn cô đơn, những ai đang cần bổ sung vitamin hạnh phúc “truy tìm” những niềm vui bị bỏ quên hay tuyệt chiêu để đối phó với stress.
Bởi tô màu là một hình thức chữa lành đơn giản mà hiệu quả, nên mỗi khi thấy bực dọc, chán nản, hay khiến mình bận rộn hơn hãy thử tìm tới “Tô bình yên - vẽ hạnh phúc” cùng hộp màu đã cất lâu trong tủ và... Sao không thể là một đám mây màu tím, một mái tóc vàng tươi hay một nụ hoa màu xanh biển nhỉ? Không cần phải đắn đo đâu, bạn cứ thoải mái xóa đi căng thẳng, xóa đi những gam màu u ám, tự tay mình điểm tô những màu sắc tươi sáng lấp lánh, đầy ắp hy vọng theo ý thích, tận hưởng những phút thư giãn thật bình yên không muộn phiền thôi nào.`,
};

function page() {
  const { id } = useParams();
  const [details, setDetails] = useState(detail);
  const userId = localStorage.getItem("id"); // Lấy userId từ localStorage

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
        const response = await axios.get(`http://localhost:8081/book/${id}`);
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
          pages: 256,
          isbn: "978-604-2-18920-5",
          language: "Tiếng Việt",
          publish_year: book.nam,
          cover_image: book.hinhAnh[0],
          description: book.moTa,
        };

        setDetails(convertedBook);
      } catch (error) {
        console.error("Lỗi khi fetch sách:", error);
      }
    };

    fetchBook();
  }, []);

  const handleAddToCart = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8081/carts/user/${userId}`,
        {
          books: [{ id: id }], // đưa vào mảng 1 phần tử
        }
      );

      alert("Đã thêm sách vào giỏ!");
      console.log(res.data);

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
        "http://localhost:8081/borrow-card/create",
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
      <main className="pt-16 flex">
        <LeftSideBar />
        <section className="self-stretch pr-[1.25rem] md:pl-60 ml-[1.25rem] my-auto w-full max-md:max-w-full mt-2 mb-2">
          <div className="flex flex-col p-6 bg-white rounded-xl shadow-md  md:flex-row gap-6">
            <img
              src={details.cover_image}
              alt={details.title}
              className="w-40 md:w-52 rounded-lg shadow-lg"
            />

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
                <span className="font-semibold">NXB:</span> {details.publisher}
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
                <Button
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
                <span className="font-semibold">ISBN:</span> {details.isbn}
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
        <ChatBotButton />
      </main>
    </div>
  );
}

export default page;
