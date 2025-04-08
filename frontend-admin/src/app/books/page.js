"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { ThreeDot } from "react-loading-indicators";

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookList, setBookList] = useState(null);
  const [filterBooks, setFilterBooks] = useState([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [deleteOne, setDeleteOne] = useState(null);
  const [loading, setLoading] = useState(false)
  const handleSearch = () => {
    if (searchQuery) {
      const filterBook = bookList.filter((book) =>
        book.maSach.toString() === searchQuery || //tìm theo id
        book?.tenSach.toLowerCase().includes(searchQuery.toLowerCase()) || //tìm theo tên sách
        book?.tenTacGia.toLowerCase().includes(searchQuery.toLowerCase()) || //tìm theo tên tg
        book?.theLoai?.toLowerCase().includes(searchQuery.toLowerCase()) //tìm theo nội dung bài viết
          ? book
          : null
      );
      if (filterBook.length < 1) toast.error("Không tìm thấy kết quả");
      setFilterBooks(filterBook);
    } else {
      setFilterBooks([]);
    }
  };
  const route = useRouter();
  const handleAddBook = () => {
    route.push(`/books/addBook`);
  };
  const handleEdit = (MaSach) => {
    route.push(`/books/${MaSach}`);
  };

  const fetchBook = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:8081/books", {
        method: "GET",
      });
  
      if (!res.ok) {
        throw new Error("Không thể lấy danh sách sách");
      }
  
      const books = await res.json();
      console.log(books)
      setBookList(books)
      setLoading(false)
    } catch (error) {
      console.error("Lỗi:", error.message);
    }
  };


  useEffect(() => {
    fetchBook();
  }, []);
  
  const handleDelete = async(book) =>{
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:8081/book/${book.maSach}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        toast.error("Xóa sách thất bại");
        setLoading(false)
        setDeleteOne(null)
        setPopUpOpen(false)
        return;
      }
  
      toast.success("Xóa sách thành công")
      setLoading(false)
      await fetchBook()
      setDeleteOne(null)
      setPopUpOpen(false)
    } catch (error) {
      console.error("Lỗi:", error.message);
    }
  } 

  const BookCard = ({ book }) => {
    return (
      <div className="flex bg-white w-full rounded-lg mt-2 relative drop-shadow-lg p-5 gap-[20px] md:gap-[50px] items-center">
        <img src={`${book.hinhAnh[0]}`} className="w-[145px] h-[205px]" />
        <div className="flex flex-col gap-[10px] relative w-full">
          <p className="">ID:&nbsp;{book.maSach}</p>
          <p className="font-bold">{book.tenSach}</p>
          <p className="italic">{book.tenTacGia}</p>
          <p className="italic">{book.theLoai}</p>
          <p className="">Số lượng tồn:&nbsp;{book.soLuongTon}</p>
          <p className="">Số lượng mượn:&nbsp;{book.soLuongMuon}</p>
          <div className="w-full flex justify-end gap-5 md:gap-10">
            <Button
              className="w-10 md:w-40 h-10 bg-[#062D76] hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                handleEdit(book.maSach);
              }}
            >
              <Pencil className="w-5 h-5" color="white" />
              <p className="hidden md:block">Sửa sách</p>
            </Button>
            <Button
              className="w-10 md:w-40 h-10 bg-[#D66766] hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                setDeleteOne(book);
                setPopUpOpen(true);
              }}
            >
              <Trash2 className="w-5 h-5" color="white" />
              <p className="hidden md:block">Xóa sách</p>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row w-full min-h-screen h-full  bg-[#EFF3FB]">
      <Sidebar />
      {loading ? (
        <div className="flex md:ml-52 w-full h-screen justify-center items-center">
          <ThreeDot
            color="#062D76"
            size="large"
            text="Vui lòng chờ"
            variant="bounce"
            textColor="#062D76"
          />
        </div>
      ) : (
      <div className="flex w-full flex-col py-6 md:ml-52 relative mt-5 gap-2 items-center px-10">
        <div className="flex w-full items-center h-[10px] justify-between mb-10">
          <div className="flex gap-5">
            <Input
              type="text"
              placeholder="Tìm kiếm"
              className="w-sm md:w-3xl h-10 font-thin italic text-black text-2xl bg-white rounded-[10px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              className="w-10 h-10 cursor-pointer text-[20px] bg-[#062D76] hover:bg-gray-700 font-bold rounded-[10px] overflow-hidden"
              onClick={() => {
                handleSearch();
              }}
            >
              <Search className="w-10 h-10" color="white" />
            </Button>
          </div>
          <Button
            className="w-40 h-10 cursor-pointer bg-[#062D76] hover:bg-gray-700 font-bold rounded-[10px] overflow-hidden"
            onClick={() => {
              handleAddBook();
            }}
          >
            <Plus className="w-5 h-5" color="white" />
            Thêm sách mới
          </Button>
        </div>
        {bookList &&
          (filterBooks.length > 0 //nếu đang search thì hiện danh sách lọc
            ? filterBooks.map((book) => {
                return <BookCard key={book?.maSach} book={book} />;
              })
            : bookList.map((book) => {
                return <BookCard key={book?.maSach} book={book} />;
              }))}
      </div>)}
      {popUpOpen && (
        <div className="fixed inset-0 items-center justify-center z-100 flex">
          <div className="w-full h-full bg-black opacity-[80%] absolute top-0 left-0"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-120 fixed">
            <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa sách này không?</p>
            <div className="flex bg-white w-full rounded-lg mt-2 relative p-5 gap-[20px] md:gap-[50px] items-center">
              <img
                src={`${deleteOne.hinhAnh[0]}`}
                className="w-[145px] h-[205px]"
              />
              <div className="flex flex-col gap-[10px] relative w-full">
                <p className="">ID:&nbsp;{deleteOne.maSach}</p>
                <p className="font-bold">{deleteOne.tenSach}</p>
                <p className="italic">{deleteOne.tenTacGia}</p>
                <p className="italic">{deleteOne.theLoai}</p>
                <p className="italic">Số lượng tồn:&nbsp;{deleteOne.soLuongTon}</p>
                <p className="italic">Số lượng mượn:&nbsp;{deleteOne.soLuongMuon}</p>
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
                onClick={() => {handleDelete(deleteOne)}}
              >
                Xóa
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
