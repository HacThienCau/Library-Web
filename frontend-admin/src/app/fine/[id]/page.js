"use client";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { Button } from "@/app/components/ui/button";
import { Receipt, Undo2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const params = useParams();
  const MaPhieuPhat = params.id;
  const [fine, setFine] = useState(null);
  const [username, setUsername] = useState(null);
  const [borrowDetail, setBorrowDetail] = useState(null);
  const fetchFine = async () => {
    const rs =
      //API lấy phiếu theo MaPhieuPhat






      {
        MaPhieuPhat: MaPhieuPhat,
        MaNguoiDung: "userId 1",
        TongTien: 20000,
        NoiDung: "Trả sách trễ hạn",
        MaPhieuMuon: "2",
        TrangThai: "Đã Thanh Toán",
        NgayThanhToan: "25/03/2025",
      };
    setFine(rs);
    setUsername(getUsername(rs.MaNguoiDung));
    setBorrowDetail(await getBorrowDetail(rs.MaPhieuMuon, rs.NoiDung));
  };
  const getUsername = async (userId) => {










    const rs = "Example Username"; //API lấy tên người dùng từ ID người dùng
    return rs;
  };
  const getBorrowDetail = async (id, NoiDung) => {
    if (NoiDung === "Trả sách trễ hạn") {
      //id sẽ là mã phiếu mượn
      const rs =












        //API lấy chi tiết phiếu mượn từ id , giao bảng ở backend luôn
        {
          MaPhieuMuon: id,
          MaNguoiDung: "1",
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
        };
      const chiTietSach = await Promise.all(
        rs.ChiTietPhieuMuon.map(async (book) => {
          const sach = await getSach(book.MaSach);
          return { ...book, ...sach }; // Gộp dữ liệu sách vào book
        })
      );
      rs.ChiTietPhieuMuon = chiTietSach; // Cập nhật lại danh sách chi tiết phiếu mượn
      return rs;
    }
    if (NoiDung === "Làm mất/hư hỏng sách") {
      //id sẽ là mã sách
      const rs = await getSach(id);
      return { ...rs, SoLuong: 1 };
    }
    console.log("bruh");
    return "Bruh";
  };
  const getSach = async (MaSach) => {
    const rs = {
      //API lấy chi tiết sách











      
      MaSach: MaSach,
      TenSach: "Tên sách 3",
      MoTa: "Mo ta mau",
      MaTheLoai: "ma tac gia",
      MaTacGia: "ma the loai",
      HinhAnh: ["/test.webp", "3133331", "313213131", "31313123"],
      SoLuongTon: 70,
      SoLuongMuon: 3,
    };
    return rs;
  };
  const tinhSoNgayTre = (NgayHenTra, NgayTra) => {
    // Chuyển đổi chuỗi ngày thành đối tượng Date (định dạng dd/MM/yyyy)
    const [day1, month1, year1] = NgayHenTra.split("/").map(Number);
    const [day2, month2, year2] = NgayTra.split("/").map(Number);

    const dateHenTra = new Date(year1, month1 - 1, day1); // Tháng trong Date bắt đầu từ 0
    const dateTra = new Date(year2, month2 - 1, day2);

    // Tính số ngày trễ
    const diffTime = dateTra - dateHenTra;
    const diffDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0); // Đảm bảo không có số âm

    return diffDays;
  };

  useEffect(() => {
    fetchFine();
  }, []);
  const route = useRouter();
  const handleGoBack = () => {
    route.back();
  };
  const BookCard = ({ book }) => {
    return (
      <div className="flex bg-white w-full rounded-lg mt-2 relative drop-shadow-lg p-5 gap-[20px] md:gap-[50px] items-center">
        <img src={`${book.HinhAnh[0]}`} className="w-[145px] h-[205px]" />
        <div className="flex flex-col gap-[10px] relative w-full">
          <p className="font-bold">{book.TenSach}</p>
          <p className="italic">{book.MaTacGia}</p>
          <p className="">ID:&nbsp;{book.MaSach}</p>
        </div>
        <div className="w-full flex justify-end gap-5 md:gap-10 items-center">
          <p className="font-bold">Số Lượng:</p>
          <p className="w-10 h-10 rounded-lg border-2 flex justify-center items-center">
            {book.SoLuong}
          </p>
        </div>
      </div>
    );
  };
  const handleThanhToan = async()=>{
    //API Thanh Toán 
    fetchFine()
  }
  return (
    <div className="flex flex-row w-full h-dvh bg-[#EFF3FB]">
      <Sidebar />
      <div className="flex w-full flex-col py-6 md:ml-52 relative mt-10 gap-2 items-center px-10">
        {/*Main*/}
        {/*Nút Back - Floating Button*/}
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
        {fine && (
          <div className="flex flex-col w-full gap-[5px] md:gap-[10px] items-center">
            <div className="flex bg-white w-full rounded-lg mt-2 relative drop-shadow-lg p-5 gap-[20px] md:gap-[50px] items-center">
              <div className="flex flex-col gap-[10px] relative w-full">
                <p className="font-bold">ID:&nbsp;{fine.MaPhieuPhat}</p>
                <p className="font-bold">Số Tiền:&nbsp;{fine.TongTien}&nbsp;đồng</p>
                <p className="">Nội Dung:&nbsp;{fine.NoiDung}</p>
              </div>
              <div className="flex flex-col gap-[10px] relative w-full">
                <p className="">ID Người Dùng:&nbsp;{fine.MaNguoiDung}</p>
                <p className="">Tên Người Dùng:&nbsp;{username}</p>
                <p className={`font-bold ${fine?.TrangThai==="Chưa Thanh Toán"?"hidden":"flex"}`}>Ngày Thanh Toán:&nbsp;{fine.NgayThanhToan}</p>
              </div>
            </div>
            {borrowDetail && (
              <div className="flex flex-col gap-[10px] relative bg-white w-full rounded-lg mt-2 relative drop-shadow-lg p-5 items-center">
                {fine.NoiDung === "Trả sách trễ hạn" && (
                  <div className="flex flex-col w-full">
                    <div className="flex w-full gap-[20px] md:gap-[50px]">
                      <div className="flex flex-col gap-[10px] relative w-full mb-5">
                        <p className="">
                          ID Phiếu Mượn:&nbsp;{fine.MaPhieuMuon}
                        </p>
                        <p className="">
                          Số Ngày Trễ Hạn:&nbsp;
                          {tinhSoNgayTre(
                            borrowDetail?.NgayHenTra,
                            borrowDetail?.NgayTra
                          )}
                        </p>
                      </div>
                      <div className="flex flex-col gap-[10px] relative w-full">
                        <p className="">
                          Ngày Mượn Sách:&nbsp;
                          {borrowDetail?.NgayMuon}
                        </p>
                        <p className="">
                          Ngày Trả Sách:&nbsp;
                          {borrowDetail?.NgayTra}
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-70 overflow-y-scroll">
                      {borrowDetail?.ChiTietPhieuMuon?.map((book, index) => {
                        return <BookCard key={index} book={book} />;
                      })}
                    </div>
                  </div>
                )}
                {fine?.NoiDung === "Làm mất/hư hỏng sách" && (
                  <div className="w-full h-70 overflow-y-scroll">
                    <BookCard book={borrowDetail} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <div className="w-full bottom-0 px-10 left-0 md:left-52 md:w-[calc(100%-208px)] fixed border-2 h-20 bg-white flex items-center justify-between">
          {/*Control Bar*/}
          <div></div>
          <Button
            title={"Thanh Toán"}
            disabled={fine?.TrangThai==="Chưa Thanh Toán"?false:true}
            className={`rounded-3xl w-40 h-12 ${fine?.TrangThai==="Chưa Thanh Toán"?"bg-[#062D76]":"bg-[#b6cefa]"}`}
            onClick={() => {
              console.log("Thanh Toan clicked");
            }}
          >
            <Receipt className="w-24 h-24" color="white" />
            {fine?.TrangThai==="Chưa Thanh Toán"?"Thanh Toán":"Đã Thanh Toán"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
