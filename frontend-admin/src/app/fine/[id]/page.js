"use client";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { Button } from "@/app/components/ui/button";
import { Receipt, Undo2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function page() {
  const params = useParams();
  const id = params.id;
  const [fine, setFine] = useState(null);
  const [borrowInfo, setBorrowInfo] = useState([])
  const fetchFine = async () => {
    try {
      const response = await fetch(`http://localhost:8081/fine/${id}`)
      const res = await response.json();
      setFine(res)
    } catch (error) {
      console.log
    }
  };
  const fetchBookInfo = async (bookId) => {
    const res = await fetch(`http://localhost:8081/book/${bookId}`);
    return res.json();
  };
  const fetchInfo = async() =>{
    console.log(fine)
    try {
      const books = await Promise.all(
        fine?.cardId?.childBookIds?.map(async (childBook) => {
          const parentId = (await (await fetch(`http://localhost:8081/child/${childBook}`)).json())?.idParent;
          const data = await fetchBookInfo(parentId);
          return {parentBook:{...data},childBook:{id:childBook}};
        })
      );
      console.log(books)
      setBorrowInfo(books);
    } catch (error) {
      console.error("Lỗi khi tải thông tin sách:", error);
    }
  }
  useEffect(() => {
    fetchFine();
  }, []);
  useEffect(()=>{
    if(fine && fine.noiDung==="Trả sách trễ hạn"){
      fetchInfo();
    }
  },[fine])
  const route = useRouter();
  const handleGoBack = () => {
    route.back();
  };
  const BookCard = ({ book }) => {
    return (
      <div className="flex bg-white w-full rounded-lg mt-2 relative drop-shadow-lg p-5 gap-[20px] md:gap-[50px] items-center">
        <img src={`${book?.parentBook?.hinhAnh[0]}`} className="w-[145px] h-[205px]" />
        <div className="flex flex-col gap-[10px] relative w-full">
          <p className="font-bold">ID sách:&nbsp;{book?.childBook?.id}</p>
          <p className="font-bold">{book?.parentBook?.tenSach}</p>
          <p className="italic">{book?.parentBook?.tenTacGia}</p>
          <p className="">{book?.parentBook?.tenTheLoaiCon}</p>
        </div>
      </div>
    );
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN"); // Kết quả: 22/04/2025
  };
  const handleThanhToan = async()=>{
    const response = await fetch(`http://localhost:8081/fine/pay/${id}`,{
      method: 'PUT'
    })  
    toast.success("Thanh toán thành công.")
    fetchFine()
  }
  return (
    <div className="flex flex-row w-full h-dvh bg-[#EFF3FB]">
      <Sidebar />
      <div className="flex w-full flex-col py-6 md:ml-52 relative mt-10 gap-2 items-center px-10">
        {/*Main*/}
        {/*Nút Back - Floating Button*/}
        <div className="top-5 left-5 md:left-57 fixed">
          <Button
            title={"Quay Lại"}
            className="bg-[#062D76] rounded-3xl w-10 h-10 cursor-pointer"
            onClick={() => {
              handleGoBack();
            }}
          >
            <Undo2 className="w-12 h-12" color="white" />
          </Button>
        </div>
        {fine && (
          <div className="flex flex-col w-full gap-[5px] md:gap-[10px] items-center">
            <div className="flex bg-white w-full rounded-lg mt-2 relative drop-shadow-lg p-5 gap-[20px] md:gap-[50px] items-center">
              <div className="flex flex-col gap-[10px] relative w-full">
                <p className="font-bold">ID:&nbsp;{fine?.id}</p>
                <p className="font-bold">Số Tiền:&nbsp;{fine?.soTien.toLocaleString("vi-VN")}&nbsp;đồng</p>
                <p className="">Nội Dung:&nbsp;{fine?.noiDung}</p>
              </div>
              <div className="flex flex-col gap-[10px] relative w-full">
                <p className="">ID Người Dùng:&nbsp;{fine?.userId}</p>
                <p className="">Tên Người Dùng:&nbsp;{fine?.tenND}</p>
                <p className={`font-bold ${fine?.trangThai==="CHUA_THANH_TOAN"?"hidden":""}`}>Ngày Thanh Toán:&nbsp;{formatDate(fine?.ngayThanhToan)}</p>
              </div>
            </div>
              <div className="flex flex-col gap-[10px] bg-white w-full rounded-lg mt-2 relative drop-shadow-lg p-5 items-center">
                {fine.noiDung === "Trả sách trễ hạn" && (
                  <div className="flex flex-col w-full">
                    <div className="flex w-full gap-[20px] md:gap-[50px]">
                      <div className="flex flex-col gap-[10px] relative w-full mb-5">
                        <p className="">
                          ID Phiếu Mượn:&nbsp;{fine?.cardId?.id}
                        </p>
                        <p className="">
                          Số Ngày Trễ Hạn:&nbsp;
                          {fine?.cardId?.ngayHenTra?formatDate(fine?.cardId?.ngayHenTra):0}
                        </p>
                      </div>
                      <div className="flex flex-col gap-[10px] relative w-full">
                        <p className="">
                          Ngày Mượn Sách:&nbsp;
                          {formatDate(fine?.cardId?.getBookDate)}
                        </p>
                        <p className="">
                          Ngày Trả Sách:&nbsp;
                          {formatDate(fine?.cardId?.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-70 overflow-y-scroll">
                      {borrowInfo?.map((book, index) => {
                        return <BookCard key={index} book={book} />;
                      })}
                    </div>
                  </div>
                )}
                {fine?.noiDung === "Làm mất sách" && (
                  <div className="w-full h-70 overflow-y-scroll">
                    <BookCard book={fine?.cardId} />
                  </div>
                )}
                {fine?.noiDung === "Khác" && (
                  <div className="w-full">
                    <p>Chi tiết:&nbsp;{fine?.cardId}</p>
                  </div>
                )}
              </div>
          </div>
        )}
        <div className="w-full bottom-0 px-10 left-0 md:left-52 md:w-[calc(100%-208px)] fixed border-2 h-20 bg-white flex items-center justify-between">
          {/*Control Bar*/}
          <div></div>
          <Button
            title={"Thanh Toán"}
            disabled={fine?.trangThai==="CHUA_THANH_TOAN"?false:true}
            className={`rounded-3xl cursor-pointer w-40 h-12 ${fine?.trangThai==="CHUA_THANH_TOAN"?"bg-[#062D76]":"bg-[#b6cefa]"}`}
            onClick={() => {
              handleThanhToan()
            }}
          >
            <Receipt className="w-24 h-24" color="white" />
            {fine?.trangThai==="CHUA_THANH_TOAN"?"Thanh Toán":"Đã Thanh Toán"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
