"use client";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import toast from "react-hot-toast";
const BackIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M38 14V26C38 28.206 36.208 30 34 30H6V24H32V16H10V20L2 13L10 6V10H34C35.0609 10 36.0783 10.4214 36.8284 11.1716C37.5786 11.9217 38 12.9391 38 14Z"
      fill="white"
    />
  </svg>
);

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()} // Điều hướng về trang trước
      className="flex justify-center items-center p-2.5 bg-red-400 rounded-xl h-[60px] w-[60px] max-sm:h-[50px] max-sm:w-[50px]"
      aria-label="Go back"
    >
      <BackIcon />
    </button>
  );
};

const initData = {
  borrowingInfo: {
    ticketId: 12,
    borrowDate: "10/03/2025",
    expectedReturnDate: "17/03/2025",
    userId: 71,
    userName: "NDHU",
    borrowQuantity: 3,
  },
  books: [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b119fd0c142d5b61752c6a2779f8f2849c878a83?placeholderIfAbsent=true&apiKey=a8e29767c993435da0efe792c3bd4a1c",
      title: "Lão Hạc",
      author: "Nam Cao",
      bookId: "176",
      quantity: "1",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6b5e73b643942ff3fc5b6aaf5e5ae3b8efd7e12e?placeholderIfAbsent=true&apiKey=a8e29767c993435da0efe792c3bd4a1c",
      title: "Vợ Nhặt (Tái Bản 2022)",
      author: "Kim Lân",
      bookId: "149",
      quantity: "2",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6b5e73b643942ff3fc5b6aaf5e5ae3b8efd7e12e?placeholderIfAbsent=true&apiKey=a8e29767c993435da0efe792c3bd4a1c",
      title: "Vợ Nhặt (Tái Bản 2022)",
      author: "Kim Lân",
      bookId: "134",
      quantity: "2",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6b5e73b643942ff3fc5b6aaf5e5ae3b8efd7e12e?placeholderIfAbsent=true&apiKey=a8e29767c993435da0efe792c3bd4a1c",
      title: "Vợ Nhặt (Tái Bản 2022)",
      author: "Kim Lân",
      bookId: "145",
      quantity: "2",
    },
  ],
};

const BookItem = ({
  image,
  title,
  author,
  bookId,
  quantity,
  hasBorder = true,
}) => {
  return (
    <article
      className={`flex overflow-hidden flex-wrap gap-5 justify-between p-8 w-full text-xl font-bold text-black ${
        hasBorder ? "border-b border-stone-300" : ""
      } max-md:px-5 max-md:max-w-full`}
    >
      <div className="flex gap-8">
        <img
          src={image}
          className="object-contain shrink-0 max-w-full aspect-[0.71] w-[100px]"
          alt={title}
        />
        <div className="flex flex-col items-start">
          <h3>{title}</h3>
          <p className="mt-3.5 text-lg">{author}</p>
          <p className="mt-3.5 text-lg">
            ID Sách: <span className="font-normal">{bookId}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <label className="text-lg">Số Lượng:</label>
        <div className="flex items-center justify-center w-[50px] h-[50px] text-lg bg-white border border-black rounded-xl">
          {quantity}
        </div>
      </div>
    </article>
  );
};

const BorrowingInfo = ({ info }) => {
  return (
    <section className="overflow-hidden py-8 pr-20 pl-8 mt-8 bg-white rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        {/* Cột 1 */}
        <div className="flex flex-col items-start text-xl font-bold text-black">
          <h2>ID Phiếu: {info.ticketId}</h2>
          <p className="mt-5">Ngày mượn: {info.borrowDate}</p>
          <p className="mt-5">Ngày trả dự kiến: {info.expectedReturnDate}</p>
        </div>

        {/* Cột 2 */}
        <div className="flex flex-col items-start text-xl font-bold text-black">
          <h2>ID Người Dùng: {info.userId}</h2>
          <p className="mt-5">Tên Người Dùng: {info.userName}</p>
          <p className="mt-5">Số lượng mượn: {info.borrowQuantity}</p>
        </div>
      </div>
    </section>
  );
};

const ChiTietPhieuMuonDangMuon = () => {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [deleteOne, setDeleteOne] = useState(null);

  const handleDelete = async (info) => {
    //Gọi API...
    //await fetchBook()
    setDeleteOne(null);
    setPopUpOpen(false);
    toast.success("Xóa phiếu thành công");
  };

  const ControlButtons = (info) => {
    return (
      <section className="fixed bottom-0 flex overflow-hidden flex-wrap gap-5 justify-between px-8 py-2.5 mt-56 w-[79.5%] text-xl font-bold text-center text-white bg-white rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-8 whitespace-nowrap">
          <button className="flex overflow-hidden gap-5 px-4 py-5 bg-red-400 rounded-xl">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a9fe9521807de35e7f966d307fab010b947a5c6?placeholderIfAbsent=true&apiKey=a8e29767c993435da0efe792c3bd4a1c"
              className="object-contain shrink-0 w-10 aspect-square"
              alt="Delete icon"
            />
            <span
              className="my-auto"
              onClick={() => {
                setDeleteOne(info.info);
                setPopUpOpen(true);
              }}
            >
              Xóa
            </span>
          </button>
  
          <button className="flex overflow-hidden gap-5 px-4 py-5 bg-red-400 rounded-xl">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0cfa36efe08c5adbfdab9b59497b3efa4940b258?placeholderIfAbsent=true&apiKey=a8e29767c993435da0efe792c3bd4a1c"
              className="object-contain shrink-0 w-10 aspect-square"
              alt="Edit icon"
            />
            <span className="my-auto">Sửa</span>
          </button>
        </div>
  
        <div className="flex flex-wrap gap-8">
          <button className="flex overflow-hidden flex-auto gap-5 px-14 py-5 bg-rose-100 rounded-xl max-md:px-5">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1a2603ec9f943ddb9911ddb834948874e1a7df8?placeholderIfAbsent=true&apiKey=a8e29767c993435da0efe792c3bd4a1c"
              className="object-contain shrink-0 self-start w-10 aspect-square"
              alt="Delivery icon"
            />
            <span className="basis-auto">Đã Giao</span>
          </button>
  
          <button className="flex overflow-hidden flex-auto gap-8 px-12 py-5 bg-red-400 rounded-xl max-md:px-5">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/db540d6e6a07d00a70b13ac958a47e13501d75aa?placeholderIfAbsent=true&apiKey=a8e29767c993435da0efe792c3bd4a1c"
              className="object-contain shrink-0 w-10 aspect-square"
              alt="Return icon"
            />
            <span className="my-auto basis-auto">Trả Sách</span>
          </button>
        </div>
      </section>
    );
  };  

  return (
    <main className="overflow-hidden bg-pink-50 pb-[120px]">
      <div className="flex gap-5 max-md:flex-col">
        <aside className="w-[15%] max-md:ml-0 max-md:w-full">
          <Sidebar />
        </aside>

        <div className="w-[80%] max-md:ml-0 max-md:w-full">
          <div className="mt-8 w-full max-md:max-w-full">
            <div className="px-8 w-full max-md:px-5 max-md:max-w-full">
              <BackButton />

              <BorrowingInfo info={initData.borrowingInfo} />

              <section className="overflow-hidden mt-2.5 w-full bg-white rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:max-w-full">
                {initData.books.map((book, index) => (
                  <BookItem
                    key={book.bookId}
                    {...book}
                    hasBorder={index !== initData.books.length - 1}
                  />
                ))}
              </section>
            </div>

            <ControlButtons key={initData?.borrowingInfo?.ticketId} info={initData.borrowingInfo}/>
          </div>
        </div>
      </div>
      <div>
        {popUpOpen && (
          <div className="fixed inset-0 items-center justify-center z-100 flex">
            <div className="w-full h-full bg-black opacity-[80%] absolute top-0 left-0"></div> 
            <div className="bg-white p-6 rounded-lg shadow-lg w-120 fixed">
              <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
              <p>Bạn có chắc chắn muốn xóa phiếu này không?</p>
              <div className="flex bg-white w-full rounded-lg mt-2 relative p-5 gap-[20px] md:gap-[50px] items-center">
                <div className="flex flex-col gap-[10px] relative w-full">
                  <p className="">ID:&nbsp;{deleteOne.ticketId}</p>
                  <p className="font-bold">Ngày mượn: {deleteOne.borrowDate}</p>
                  <p className="italic">Người mượn:&nbsp;{deleteOne.userName}</p>
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-4">
                <Button
                  className="bg-gray-500 hover:bg-gray-700 text-white"
                  onClick={() => setPopUpOpen(false)}
                >
                  Hủy
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white"
                  onClick={() => {
                    handleDelete(deleteOne);
                  }}
                >
                  Xóa
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ChiTietPhieuMuonDangMuon;
