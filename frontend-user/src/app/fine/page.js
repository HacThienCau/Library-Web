"use client";
import React, { useEffect, useState } from "react";
import LeftSideBar from "@/app/components/LeftSideBar";
import ChatBotButton from "@/app/components/ChatBotButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Plus, Search, ReceiptText, Timer, DollarSign } from "lucide-react";
import { ThreeDot } from "react-loading-indicators";
import toast from "react-hot-toast";

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFines, setFilterFines] = useState([]);
  const [needToPay, setNeedToPay] = useState([]);
  const [paid, setPaid] = useState([]);
  const [mode, setMode] = useState(0); //0 là chưa thanh toán, 1 là đã thanh toán
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    //Hàm tìm kiếm
    if (searchQuery) {
      setLoading(true);
      const fineList = mode === 0 ? needToPay : paid;
      const filterFine = fineList.filter((book) =>
        book.MaPhieuPhat.toString() === searchQuery || //tìm theo id
        book?.MaNguoiDung.toLowerCase().includes(searchQuery.toLowerCase()) //tìm theo tên sách
          ? book
          : null
      );
      setFilterFines(filterFine);
      setLoading(false);
      if (filterFine.length < 1) toast.error("Không tìm thấy kết quả");
    } else {
      setFilterFines([]);
    }
  };

  const route = useRouter();
  const handleAddFine = () => {
    //Chuyển sang trang thêm phiếu phạt
    route.push(`/fine/addFine`);
  };
  const handleDetail = (MaPhat) => {
    //Chuyển sang trang chi tiết phiếu phạt
    route.push(`/fine/${MaPhat}`);
  };

  const fetchFine = async () => {
    //Hàm lấy ds phiếu phạt, sau đó chia theo status
    setLoading(true);
    needToPay.length = 0; //reset mảng
    paid.length = 0;
    const test =
      //thay API vào đây
      [
        {
          MaPhieuPhat: "1",
          MaNguoiDung: "userId 1",
          SoTien: 20000,
          NoiDung: "Trả sách trễ hạn",
          MaPhieuMuon: "2",
          Status: "Đã Thanh Toán",
        },
        {
          MaPhieuPhat: "2",
          MaNguoiDung: "userId 2",
          SoTien: 15000,
          NoiDung: "Trả sách trễ hạn",
          MaPhieuMuon: "122",
          Status: "Đã Thanh Toán",
        },
        {
          MaPhieuPhat: "3",
          MaNguoiDung: "userId 3",
          SoTien: 750000,
          NoiDung: "Làm mất sách",
          MaPhieuMuon: "123", //Nếu nội dung là làm mất/hư hỏng sách thì MaPhieuMuon chứa id sách
          Status: "Đã Thanh Toán",
        },
        {
          MaPhieuPhat: "4",
          MaNguoiDung: "userId 2",
          SoTien: 150000,
          NoiDung: "Trả sách trễ hạn",
          MaPhieuMuon: "2",
          Status: "Chưa Thanh Toán",
        },
      ];
    test.map((fine) => {
      fine.Status === "Chưa Thanh Toán"
        ? needToPay.push(fine)
        : paid.push(fine);
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchFine();
    setMode(0);
    setSearchQuery("");
    handleSearch();
  }, []);

  const FineCard = ({ fine }) => {
    //Component phiếu phạt
    return (
      <div className="flex bg-white w-full rounded-lg mt-2 relative drop-shadow-lg p-5 gap-[20px] md:gap-[50px] items-center">
        <div className="flex flex-col gap-[10px] relative w-full">
          <p className="font-bold">ID:&nbsp;{fine.MaPhieuPhat}</p>
          <p className="">User ID:&nbsp;{fine.MaNguoiDung}</p>
          <p className="font-bold">Số Tiền:&nbsp;{fine.SoTien}&nbsp;đồng</p>
          <p className="">Nội Dung:&nbsp;{fine.NoiDung}</p>
        </div>
        <div className="w-full flex justify-end mr-10">
          <Button
            title={"Xem Chi Tiết"}
            className="w-15 md:w-60 h-10 bg-[#062D76] hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              handleDetail(fine.MaPhieuPhat);
            }}
          >
            <ReceiptText className="w-5 h-5" color="white" />
            <p className="hidden md:block text-[1.125rem] font-medium text-white w-[fit] cursor-pointer">Xem chi tiết</p>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <main className="flex flex-col min-h-screen text-foreground">
      <div className="pt-16 flex">
        <LeftSideBar />
        <section className="self-stretch pr-[1.25rem] md:pl-60 ml-[1.25rem] my-auto w-full max-md:max-w-full mt-2 mb-2">
          {/*Main*/}
          <div className="flex w-full items-center justify-between mb-10">
            <div className="flex w-1/2 gap-10">
              <Button
                title={"Chưa Thanh Toán"}
                className={`w-50 h-10 cursor-pointer ${
                  mode === 0 ? "bg-[#062D76]" : "bg-[#b6cefa]"
                } hover:bg-gray-500 font-bold rounded-[10px] overflow-hidden`}
                onClick={() => {
                  setMode(0);
                  setSearchQuery("");
                  filterFines.length = 0;
                }}
              >
                <Timer className="w-5 h-5" color="white" />
                Chưa Thanh Toán
              </Button>
              <Button
                title={"Đã Thanh Toán"}
                className={`w-50 h-10 cursor-pointer ${
                  mode === 1 ? "bg-[#062D76]" : "bg-[#b6cefa]"
                }  hover:bg-gray-500 font-bold rounded-[10px] overflow-hidden`}
                onClick={() => {
                  setMode(1);
                  setSearchQuery("");
                  filterFines.length = 0;
                }}
              >
                <DollarSign className="w-5 h-5" color="white" />
                Đã Thanh Toán
              </Button>
            </div>
            <div className="flex gap-5">
              <Input
                type="text"
                placeholder="Tìm kiếm"
                className="h-10 font-thin italic text-black text-2xl w-full bg-white rounded-[10px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                title={"Tìm kiếm"}
                className="w-10 h-10 cursor-pointer text-[20px] bg-[#062D76] hover:bg-gray-700 font-bold rounded-[10px] overflow-hidden"
                onClick={() => {
                  handleSearch();
                }}
              >
                <Search className="w-10 h-10" color="white" />
              </Button>
            </div>
          </div>
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
          ) : mode === 0 ? (
            filterFines.length > 0 ? ( //nếu đang search thì hiện danh sách lọc
              filterFines.map((fine) => {
                return <FineCard key={fine?.MaPhieuPhat} fine={fine} />;
              })
            ) : (
              needToPay.map((fine) => {
                return <FineCard key={fine?.MaPhieuPhat} fine={fine} />;
              })
            )
          ) : filterFines.length > 0 ? ( //nếu đang search thì hiện danh sách lọc
            filterFines.map((fine) => {
              return <FineCard key={fine?.MaPhieuPhat} fine={fine} />;
            })
          ) : (
            paid.map((fine) => {
              return <FineCard key={fine?.MaPhieuPhat} fine={fine} />;
            })
          )}
        </section>
        <ChatBotButton />
      </div>
    </main>
  );
};

export default page;
