"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../components/sidebar/Sidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useRouter } from "next/navigation";
import { Barcode, Pencil, Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ThreeDot } from "react-loading-indicators";

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState(null);
  const [filterUsers, setFilterUsers] = useState([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [deleteOne, setDeleteOne] = useState(null);
    const [loading, setLoading] = useState(false);
  const handleSearch = () => {
    if (searchQuery) {
      const filterUser = userList.filter((user) =>
        user.id.toString() === searchQuery || //tìm theo id
        user?.tenND.toLowerCase().includes(searchQuery.toLowerCase()) //tìm theo tên user
          ? user
          : null
      );
      if (filterUser.length < 1) toast.error("Không tìm thấy kết quả");
      setFilterUsers(filterUser);
    } else {
      setFilterUsers([]);
    }
  };
  const route = useRouter();
  const handleAddUser = () => {
    route.push(`/users/addUser`);
  };
  const handleEdit = (MaND) => {
    route.push(`/users/${MaND}`);
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://library-backend-ydnf.onrender.com/users");
      setUserList(response.data); // Giả sử backend trả về mảng user
      setLoading(false)
    } catch (error) {
      toast.error("Lỗi khi tải danh sách người dùng");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDelete = async (user) => {
    try {
      await axios.delete(`https://library-backend-ydnf.onrender.com/user/${user.id}`);
      toast.success("Xóa người dùng thành công");
      setPopUpOpen(false);
      setDeleteOne(null);
      fetchUser(); // tải lại danh sách mới
    } catch (error) {
      toast.error("Xóa người dùng thất bại");
      console.error(error);
    }
  };

  const UserCard = ({ user }) => {
    return (
      <div
        className="flex max-md:flex-wrap w-full rounded-lg mt-2 drop-shadow-lg p-5 gap-[1rem] md:gap-[1.5rem] items-center bg-[url('https://i.pinimg.com/736x/bd/e2/0a/bde20adbd760b57cf19d62a6f6d286f8.jpg')] bg-cover bg-left bg-repeat backdrop-blur-3xl"
      >
        <img
          src={user?.avatarUrl}
          alt="User avatar"
          className="object-cover self-stretch my-auto w-[4rem] aspect-square max-md:w-[2.5rem] border-2 border-white rounded-full shadow-md"
        />
        <div className="flex flex-col gap-[10px] justify-start w-full">
          <p className="">ID:&nbsp;{user.id}</p>
          <p className="text-[1rem]">
            Tên người dùng:{" "}
            <span className="text-[#131313] font-bold ">{user.tenND}</span>
          </p>
          <p className="">
            Ngày tham gia:&nbsp;
            {new Date(user.ngayTao).toLocaleDateString("vi-VN")}
          </p>
        </div>
        <div className="w-full flex justify-end gap-2 md:gap-3.5">
          <Button
            className="w-fit h-10 bg-[#062D76] hover:bg-gray-700 cursor-pointer"
            title="Xem barcode"
            onClick={() => {
              window.open(`${user.barcodeUrl}`, "_blank");
            }}
          >
            <Barcode className="w-5 h-5" color="white" />
            <p className="hidden md:block">Barcode</p>
          </Button>
          <Button
            className="w-fit h-10 bg-[#062D76] hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              handleEdit(user.id);
            }}
          >
            <Pencil className="w-5 h-5" color="white" />
            <p className="hidden md:block">Sửa</p>
          </Button>
          <Button
            className="w-fit h-10 bg-[#D66766] hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              setDeleteOne(user);
              setPopUpOpen(true);
            }}
          >
            <Trash2 className="w-5 h-5" color="white" />
            <p className="hidden md:block">Xóa</p>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row w-full h-full bg-[#EFF3FB]">
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
      <div className="flex w-full min-h-screen flex-col py-6 md:ml-52 relative mt-5 gap-2 items-center px-10 max-md:px-4">
        <div className="flex w-full items-center h-[10px] gap-5 mb-10">
          <div className="flex flex-1 gap-5">
            <Input
              type="text"
              placeholder="Tìm kiếm người dùng"
              className="flex flex-1 h-10 font-thin text-black text-[1.5rem] self-center bg-white rounded-[10px] placeholder:text-[1rem]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
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
            className="flex w-40 h-10 cursor-pointer bg-[#062D76] hover:bg-gray-700 font-bold rounded-[10px] overflow-hidden"
            onClick={() => {
              handleAddUser();
            }}
          >
            <Plus className="w-5 h-5" color="white" />
            Thêm người dùng
          </Button>
        </div>

        {userList &&
          (filterUsers.length > 0 //nếu đang search thì hiện danh sách lọc
            ? filterUsers.map((user) => {
                return <UserCard key={user?.id} user={user} />;
              })
            : userList.map((user) => {
                return <UserCard key={user?.id} user={user} />;
              }))}
      </div>)}
      {popUpOpen && (
        <div className="fixed inset-0 items-center justify-center z-100 flex">
          <div className="w-full h-full bg-black opacity-[80%] absolute top-0 left-0"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-120 fixed">
            <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
            <div className="flex bg-white w-full rounded-lg mt-2 relative p-5 gap-[20px] md:gap-[50px] items-center border-2 border-gray-300">
              <img
                src= {deleteOne?.avatarUrl}
                alt="User avatar"
                className="object-cover self-stretch my-auto w-[4rem] aspect-square max-md:w-[2.5rem] border-2 border-white rounded-full shadow-md"
              />
              <div className="flex flex-col gap-[10px] relative w-full">
                <p className="">ID:&nbsp;{deleteOne.id}</p>
                <p className="text-[1rem]">
                  Tên người dùng:{" "}
                  <span className="text-[#131313] font-bold ">
                    {deleteOne.tenND}
                  </span>
                </p>
                <p className="">
                  Ngày tham gia:&nbsp;
                  {new Date(deleteOne.ngayTao).toLocaleDateString("vi-VN")}
                </p>
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
  );
};

export default page;
