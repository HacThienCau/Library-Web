"use client";
import React, { useState, useEffect } from "react";
import LeftSideBar from "../components/LeftSideBar";
import ChatBotButton from "../components/ChatBotButton";
import UploadButton from "./UploadButton";
import toast from "react-hot-toast";
import axios from "axios";

const page = () => {
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // State để lưu trữ thông tin cá nhân
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [dobDisplay, setDobDisplay] = useState("");
  const userId = localStorage.getItem("id");
  useEffect(() => {
    if (userId) {
      fetchUserInfo(userId);
    }
  }, [userId]);

  const fetchUserInfo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/user/${id}`);
      setUserInfo(response.data);
      const iso = response.data.ngaySinh;
      setDob(iso);
      const date = new Date(iso);
      setDobDisplay(date.toLocaleDateString("vi-VN")); // dd/mm/yyyy
      setFullName(response.data.tenND); // Set initial full name from API
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  const handleSave = async () => {
    try {
      // Cập nhật thông tin người dùng
      const updatedData = { tenND: fullName, ngaySinh: dob };
      await axios.put(`http://localhost:8081/user/${userId}`, updatedData);
      toast.success("Thông tin đã được cập nhật");
      setIsEditing(false); // Tắt chế độ sửa
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      toast.error("Lỗi khi cập nhật thông tin");
    }
  };
  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <main className="pt-16 flex">
       
        <section className="self-stretch px-[1.25rem] my-auto w-full max-md:max-w-full mt-8 mb-2">
          <div className="flex flex-col p-5 w-full bg-white rounded-xl max-md:max-w-full">
            <div className="flex gap-5 justify-between items-start max-sm:flex-col">
              <div className="flex gap-3 items-center">
                <img
                  src={userInfo?.avatarUrl}
                  alt="User avatar"
                  className="object-cover shrink-0 self-stretch my-auto rounded-full aspect-square w-[5rem]"
                />
                <div className="flex flex-col gap-2.5">
                  <h2 className="text-[1.25rem] font-bold text-neutral-900">
                    {userInfo?.tenND}
                  </h2>
                  <p className="text-[1.125rem] text-neutral-900 text-opacity-50">
                    {userInfo?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (isEditing) {
                    handleSave();
                  } else {
                    setIsEditing(true);
                  }
                }}
                className="p-2.5 text-[1.25rem] text-white bg-[#062D76] hover:bg-blue-950 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out"
              >
                {isEditing ? "Lưu" : "Sửa"}
              </button>
            </div>
            <div className="mt-6">
              <h3 className="px-5 py-2.5 text-[1.25rem] text-[#062D76] rounded-lg bg-slate-200 w-fit">
                Thông tin cá nhân
              </h3>
              <div className="grid grid-cols-2 max-sm:gap-6 gap-14 mt-6 max-sm:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <label className="text-[1.125rem] text-black">
                    Tên người dùng
                  </label>
                  <div className="px-2 py-3 text-[1.125rem] text-black border-b border-black">
                    {isEditing ? (
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-transparent border-none outline-none"
                      />
                    ) : (
                      fullName
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[1.125rem] text-black">Gmail</label>
                  <div className="px-2 py-3 text-[1.125rem] text-black border-b border-black">
                    {userInfo?.email}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[1.125rem] text-black">
                    Ngày sinh
                  </label>
                  <div className="px-2 py-3 text-[1.125rem] text-black border-b border-black">
                    {isEditing ? (
                      <input
                        type="text"
                        placeholder="dd/mm/yyyy"
                        value={dobDisplay}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDobDisplay(value);

                          const [day, month, year] = value.split("/");
                          if (
                            day?.length === 2 &&
                            month?.length === 2 &&
                            year?.length === 4 &&
                            !isNaN(Date.parse(`${year}-${month}-${day}`))
                          ) {
                            setDob(`${year}-${month}-${day}`); // lưu đúng format ISO để gửi BE
                          }
                        }}
                        className="w-full bg-transparent border-none outline-none"
                      />
                    ) : dob ? (
                      new Date(dob).toLocaleDateString("vi-VN")
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="flex flex-col self-end gap-2">
                  <label className="text-[1.125rem] text-black">
                    Ngày tham gia
                  </label>
                  <div className="p-2.5 text-[1.125rem] text-black rounded-lg bg-zinc-400 bg-opacity-50">
                    {new Date(userInfo?.ngayTao).toLocaleDateString(
                      "vi-VN"
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin mượn sách */}
            <div className="mt-6">
              <h3 className="px-5 py-2.5 text-[1.25rem] text-[#062D76] rounded-lg bg-slate-200 w-fit">
                Thông tin mượn sách
              </h3>
              <div className="flex gap-3 mt-6 max-sm:flex-col">
                <article className="flex flex-col flex-1 gap-5 p-5 rounded-xl bg-slate-200">
                  <p className="text-[1.25rem] text-[#062D76]">
                    {userInfo?.soSachDangMuon}
                  </p>
                  <p className="text-[1.125rem] text-[#062D76]">
                    Tài liệu đang mượn
                  </p>
                </article>
                <article className="flex flex-col flex-1 gap-5 p-5 rounded-xl bg-slate-200">
                  <p className="text-[1.25rem] text-[#062D76]">{userInfo?.soSachQuaHan}</p>
                  <p className="text-[1.125rem] text-[#062D76]">
                    Tài liệu quá hạn
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
        <ChatBotButton />
      </main>
    </div>
  );
};

export default page;
