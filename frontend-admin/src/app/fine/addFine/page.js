"use client";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { Button } from "@/app/components/ui/button";
import { ChevronDown, CircleCheck, Undo2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

function AddFine() {
  const [user, setUser] = useState(null); //user đang chọn
  const [isDropDownOpen, setDropDownOpen] = useState(false); //user
  const [isBorrowDropDownOpen, setBorrowDropDownOpen] = useState(false);
  const [isBookDropDownOpen, setBookDropDownOpen] = useState(false);
  const [money, setMoney] = useState(0);
  const [reason, setReason] = useState(null);
  const [more, setMore] = useState("");
  const [borrow, setBorrow] = useState(null); //phiếu mượn đang chọn
  const [book, setBook] = useState(null); //sách đang chọn
  const route = useRouter();
  const handleGoBack = () => {
    route.back();
  };
  const [userList, setUserList] = useState([]);
  const [borrowList, setBorrowList] = useState([]);
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    const fetchUser = [
      // lấy danh sách người dùng

      {
        MaNguoiDung: "1234144",
        TenNguoiDung: "Nguyễn Lê Thanh Huyền",
        //.....
      },
      {
        MaNguoiDung: "12313314",
        TenNguoiDung: "Nguyễn Đăng Hương Uyên",
        //.....
      },
      {
        MaNguoiDung: "12133114",
        TenNguoiDung: "Lê Nguyễn Thùy Dương",
        //.....
      },
      {
        MaNguoiDung: "124213314",
        TenNguoiDung: "Đỗ Mai Tường Vy",
        //.....
      },
    ];
    setUserList(fetchUser);

    const fetchBorrow = [
      //Lấy danh sách phiếu mượn
      {
        MaPhieuMuon: "1",
        MaNguoiDung: "1234144",
        NgayMuon: "01/01/2025",
        NgayHenTra: "14/01/2025",
        NgayTra: "01/02/2025",
        ChiTietPhieuMuon: [
          {
            MaSach: "2",
            SoLuong: 1,
          },
          {
            MaSach: "4",
            SoLuong: 1,
          },
          {
            MaSach: "7",
            SoLuong: 2,
          },
        ],
      },
      {
        MaPhieuMuon: "13",
        MaNguoiDung: user?.MaNguoiDung,
        NgayMuon: "01/01/2025",
        NgayHenTra: "14/01/2025",
        NgayTra: "01/02/2025",
        ChiTietPhieuMuon: [
          {
            MaSach: "2",
            SoLuong: 1,
          },
          {
            MaSach: "4",
            SoLuong: 1,
          },
          {
            MaSach: "7",
            SoLuong: 2,
          },
        ],
      },
    ];
    setBorrowList(fetchBorrow);

    const fetchBook = [
      //Lấy danh sách sách
      {
        MaSach: "123",
      TenSach: "Tên sách 3",
      MoTa: "Mo ta mau",
      MaTheLoai: "ma tac gia",
      MaTacGia: "ma the loai",
      HinhAnh: ["/test.webp", "3133331", "313213131", "31313123"],
      SoLuongTon: 70,
      SoLuongMuon: 3,
      },
      {
        MaSach: "23131",
      TenSach: "Tên sách 3",
      MoTa: "Mo ta mau",
      MaTheLoai: "ma tac gia",
      MaTacGia: "ma the loai",
      HinhAnh: ["/test.webp", "3133331", "313213131", "31313123"],
      SoLuongTon: 50,
      SoLuongMuon: 1,
      },
    ];
    setBookList(fetchBook);
  }, []);
  const openDropDownUserList = () => {
    setDropDownOpen(!isDropDownOpen);
  };
  const openDropDownBorrowList = () => {
    setBorrowDropDownOpen(!isBorrowDropDownOpen);
  };
  const openDropDownBookList = () => {
    setBookDropDownOpen(!isBookDropDownOpen);
  };
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };
  const handleSubmit = () =>{
    if(!user){ toast.error("Vui lòng chọn ID người dùng.") 
      return
    }
    if(!money) {toast.error("Vui lòng nhập số tiền phạt")
      return
    }
    if(money <= 0) {toast.error("Số tiền không được nhỏ hơn hoặc bằng 0")
      return
    }
    if(!reason) {toast.error("Vui lòng chọn nội dung")
      return
    }
    if(reason === "Trả sách trễ hạn" && !borrow) {toast.error("Vui lòng chọn phiếu mượn")
      return
    }
    if(reason === "Khác" && !more) {toast.error("Vui lòng nhập nội dung")
      return
    }
    console.log(
      "Nội dung phiếu phạt mới:",
      "\nMaNguoiDung: ",user?.MaNguoiDung,
      "\nTenNguoiDung: ",user?.TenNguoiDung,
      "\nSoTien: ",money,
      "\nNoiDung: ",reason,
      "\nMaPhieuMuon: ", reason==="Trả sách trễ hạn"?borrow.MaPhieuMuon:reason==="Khác"?more:book,
      "\nStatus: " , "Chưa Thanh Toán"
    )
  }
  return (
    <div className="flex flex-row w-full h-dvh bg-[#EFF3FB]">
      <Sidebar />
      <div className="flex w-full flex-col py-6 md:ml-52 relative mt-10 gap-2 items-center px-10">
        {/*Nút Back*/}
        <div className="absolute top-5 left-5 md:left-57 fixed">
          <Button
            title={"Quay Lại"}
            className="bg-[#062D76] rounded-3xl w-10 h-10"
            onClick={() => {
              handleGoBack();
            }}
          >
            <Undo2 className="w-12 h-12" color="white" />
          </Button>
        </div>
        {/*Dòng user*/}
        <div className="flex w-full justify-between">
          {/*Dropdown chọn ID người dùng*/}
          <div className="flex flex-col w-full gap-[5px] md:gap-[10px]">
            <p className="font-semibold text-lg mt-3">ID Người Dùng</p>
            <Button
              title={"ID Người Dùng"}
              className="bg-white text-black rounded-lg w-120 h-10 hover:bg-gray-300 flex justify-between"
              onClick={() => {
                openDropDownUserList();
              }}
            >
              {user ? user?.MaNguoiDung : "Chọn ID Người Dùng"}
              <ChevronDown className="w-12 h-12" color="#062D76" />
            </Button>
            {isDropDownOpen && (
              <div className="absolute top-40 bg-white left-62 fixed rounded-lg w-120 z-50 shadow-lg">
                {userList?.map((user, index) => {
                  return (
                    <Button
                      key={index}
                      className="flex justify-start block w-full px-4 py-2 text-left bg-white text-black hover:bg-gray-300 items-center gap-2"
                      onClick={() => {
                        setUser(user);
                        setDropDownOpen(false);
                      }}
                    >
                      {user?.MaNguoiDung}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
          {/*Tên người dùng*/}
          <div className="flex flex-col w-full gap-[5px] md:gap-[10px]">
            <p className="font-semibold text-lg mt-3">Tên Người Dùng</p>
            <p className="font-semibold text-gray-700 rounded-lg w-120 h-10 flex items-center bg-gray-300 px-5">
              {user?.TenNguoiDung}
            </p>
          </div>
        </div>
        {/*Dòng số tiền*/}
        <div className="flex flex-col w-full gap-[5px] md:gap-[10px]">
          <p className="font-semibold text-lg mt-3">Số Tiền</p>
          <Input
            type="number"
            placeholder="Nhập số tiền phạt"
            className="font-semibold rounded-lg w-full h-10 flex items-center px-5 bg-white"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>
        {/*Dòng nội dung*/}
        <div className="flex flex-col w-full gap-[5px] md:gap-[10px]">
          <p className="font-semibold text-lg mt-3">Nội Dung</p>
          {/*Nội dung 1*/}
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              name="Nội dung phiếu phạt"
              className="font-semibold w-5 h-10 flex items-center px-5"
              value="Trả sách trễ hạn"
              onChange={(e) => handleReasonChange(e)}
            />
            <p className="font-semibold text-md">Trả sách trễ hạn</p>
            <p className="font-semibold text-md ml-50">ID Phiếu Mượn</p>
            <Button
              title={"ID Phiếu Mượn"}
              className="bg-white text-black rounded-lg w-64 h-10 hover:bg-gray-300 flex justify-between"
              onClick={() => {
                openDropDownBorrowList();
              }}
            >
              {borrow ? borrow?.MaPhieuMuon : "Chọn ID Phiếu Mượn"}
              <ChevronDown className="w-12 h-12" color="#062D76" />
            </Button>
            {isBorrowDropDownOpen && (
              <div className="absolute top-88 bg-white left-179 fixed rounded-lg w-64 z-50 shadow-lg">
                {borrowList?.map((borrow, index) => {
                  return (
                    <Button
                      key={index}
                      className="flex justify-start block w-full px-4 py-2 text-left bg-white text-black hover:bg-gray-300 items-center gap-2"
                      onClick={() => {
                        setBorrow(borrow);
                        setBorrowDropDownOpen(false);
                      }}
                    >
                      {borrow?.MaPhieuMuon}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
          {/*Nội dung 2*/}
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              name="Nội dung phiếu phạt"
              className="font-semibold w-5 h-10 flex items-center px-5"
              value="Làm mất sách"
              onChange={(e) => handleReasonChange(e)}
            />
            <p className="font-semibold text-md">Làm mất sách</p>
            <p className="font-semibold text-md ml-53">ID Sách</p>
            <Button
              title={"ID Sách"}
              className="bg-white text-black rounded-lg w-64 h-10 hover:bg-gray-300 flex justify-between"
              onClick={() => {
                openDropDownBookList();
              }}
            >
              {book ? book?.MaSach : "Chọn ID Sách"}
              <ChevronDown className="w-12 h-12" color="#062D76" />
            </Button>
            {isBookDropDownOpen && (
              <div className="absolute top-101 bg-white left-164 fixed rounded-lg w-64 z-50 shadow-lg">
                {bookList?.map((book, index) => {
                  return (
                    <Button
                      key={index}
                      className="flex justify-start block w-full px-4 py-2 text-left bg-white text-black hover:bg-gray-300 items-center gap-2"
                      onClick={() => {
                        setBook(book);
                        setBookDropDownOpen(false);
                      }}
                    >
                      {book?.MaSach}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>          
          {/*Nội dung 3*/}
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              name="Nội dung phiếu phạt"
              className="font-semibold w-5 h-10 flex items-center px-5"
              value="Khác"
              onChange={(e) => handleReasonChange(e)}
            />
            <p className="font-semibold text-md">Khác</p>
            <p className="font-semibold text-md ml-70">Nội Dung</p>
            <Input
              type="text"
              placeholder="Nhập nội dung khác"
              className="font-semibold bg-white w-120 h-10 flex items-center px-5"
              value={more}
              onChange={(e) => setMore(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full bottom-0 px-10 left-0 md:left-52 md:w-[calc(100%-208px)] fixed h-20 bg-white flex items-center justify-between">
          {/*Control Bar*/}
          <div></div>
          <Button
            title={"Hoàn Tất"}
            className={`rounded-3xl w-40 h-12 bg-[#062D76]`}
            onClick={() => {handleSubmit()}}
          >
            <CircleCheck className="w-12 h-12" color="white"/>
            Hoàn Tất
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddFine;
