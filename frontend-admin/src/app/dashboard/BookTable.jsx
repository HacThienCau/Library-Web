import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThreeDot } from "react-loading-indicators";
import { Button } from "@/app/components/ui/button";

const fetchBooks = async () => {
  try {
    const response = await axios.get("https://library-backend.onrender.com/books/top5");
    return response.data;
  } catch (error) {
    toast.error("Lỗi khi tải danh sách sách");
    console.error(error);
    return [];
  }
};

const StatusBadge = ({ trangThai }) => {
  const isAvailable = trangThai === "CON_SAN";

  return (
    <div className="flex basis-1/6 min-w-0 justify-center w-full items-center">
      <div
        className={`self-center shrink w-[80%] max-w-full px-3 py-1 rounded-[99px] justify-center items-center inline-flex gap-2 ${
          isAvailable ? "bg-[#ECFDF3] text-[#037847] border-1 border-[#037847]" : "bg-[#FFEBEB] text-[#CF2E2E] border-1 border-[#CF2E2E]/50"
        }`}
      >
         <div
      className={`w-2 h-2 rounded-full ${
        isAvailable ? "bg-[#14BA6D]" : "bg-[#DB1414]"
      }`}
    />
        <p className="text-center text-[1rem] font-medium truncate">
          {isAvailable ? "Còn sẵn" : "Đã hết"}
        </p>
      </div>
    </div>
  );
};

const BookTableRow = ({ stt, tenSach, genre, quantity, viTri, trangThai }) => {
  return (
    <article className="flex shrink overflow-hidden bg-white cursor-pointer min-h-[3rem] w-full">
      <div className="flex basis-1/9 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <p className="gap-2.5 self-stretch my-auto">{stt}</p>
      </div>
      <div className="flex basis-2/9 min-w-0 justify-center items-center px-1">
        <p className="gap-2.5 self-stretch my-auto truncate">{tenSach}</p>
      </div>
      <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <p className="gap-2.5 self-stretch my-auto">{genre}</p>
      </div>
      <div className="flex basis-1/6 min-w-0 justify-center items-center">
        <p className="gap-2.5 self-stretch my-auto">{quantity}</p>
      </div>
      <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <p className="gap-2.5 self-stretch my-auto">{viTri}</p>
      </div >
      {/* <div className="flex basis-1/6 min-w-0 justify-center items-center"> */}
      <StatusBadge trangThai={trangThai} />
      {/* </div> */}
    </article>
  );
};


const BookTable = () => {

   const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchBooks();
      setBookList(data);
    };

    loadData();
  }, []);
  return (
    <section className="flex flex-col w-full text-[1rem] text-neutral-900 max-md:max-w-full">
      <header className="flex shrink overflow-hidden w-full rounded-t-3xl bg-[#EBF1F9] min-h-[3rem] max-md:max-w-full">
        <div className="flex basis-1/9 min-w-0 justify-center items-center font-medium">
          <h3 className="gap-2.5 self-stretch text-center my-auto">STT</h3>
        </div>
        <div className="flex basis-2/9 min-w-0 justify-center items-center font-medium bg-[#6C8299] text-white">
          <h3 className="gap-2.5 self-stretch text-center my-auto">Tên sách</h3>
        </div>
                <div className="flex basis-1/6 min-w-0 justify-center items-center font-medium">
          <h3 className="gap-2.5 self-stretch text-center my-auto">Thể loại</h3>
        </div>
        <div className="flex basis-1/6 min-w-0 justify-center items-center font-medium bg-[#6C8299] text-white">
          <h3 className="gap-2.5 self-stretch text-center my-auto">Số lượng</h3>
        </div>
        <div className="flex basis-1/6 min-w-0 justify-center items-center font-medium">
          <h3 className="gap-2.5 self-stretch text-center my-auto">Vị trí</h3>
        </div>
        <div className="flex basis-1/6 min-w-0 justify-center items-center font-medium bg-[#6C8299] text-white">
          <h3 className="gap-2.5 self-stretch text-center my-auto">Trạng thái</h3>
        </div>
      </header>

      <div className="flex flex-col gap-2.5 mt-2.5">
        {bookList.map((book, index) => (
            <BookTableRow
              key={book.id}
              stt={index + 1}
              tenSach={book.tenSach}
              genre={book.tenTheLoaiCon}
              quantity={book.tongSoLuong}
              viTri={book.viTri}
              trangThai={book.trangThai}
            />
          ))}
      </div>

      <button className="flex gap-3 justify-center items-start self-center px-3 py-3 mt-2.5 max-w-full leading-none bg-[#EBF1F9] rounded-[8px] w-[250px]">
        <Link href="/books"  className="gap-2.5 self-stretch">Xem tất cả</Link>
      </button>
    </section>
  );
};

export default BookTable;