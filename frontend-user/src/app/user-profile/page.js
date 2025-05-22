"use client";
import React, { useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import ChatBotButton from "../components/ChatBotButton";
import UploadButton from "./UploadButton";

const UserInfo = () => {
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // State để lưu trữ thông tin cá nhân
  const [fullName, setFullName] = useState("Đỗ Mai Tường Vy");
  const [dob, setDob] = useState("01/01/2004");
  const [phone, setPhone] = useState("0868882744");

  const handleEditClick = () => {
    if (isEditing) {
      // Nếu đang ở chế độ lưu, thực hiện lưu dữ liệu
      setShowUploadButton(false);
      console.log("Dữ liệu đã được lưu!");
    }
    setIsEditing(!isEditing); // Chuyển chế độ "Sửa" và "Lưu"
    setShowUploadButton(!isEditing); // Hiển thị button Upload khi ở chế độ "Sửa"
  };

  const handleSave = () => {
    // Khi lưu, bạn có thể thực hiện các hành động lưu dữ liệu
    setIsEditing(false);
    setShowUploadButton(false); // Ẩn nút UploadButton sau khi lưu
    console.log("Dữ liệu đã được lưu:", { fullName, dob, phone });
  };
  const lastTwoWords = fullName.split(" ").slice(-2).join(" ");

  return (
    <>
      <div className="flex gap-5 justify-between items-start max-sm:flex-col">
        <div className="flex gap-3 items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb9987cd966719f0a79fed4d14e27ca697da1ec1?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816"
            alt="User avatar"
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[5rem]"
          />
          <div className="flex flex-col gap-2.5">
            <h2 className="text-[1.25rem] font-bold text-neutral-900">Vy Đỗ </h2>
            <p className="text-[1.125rem] text-neutral-900 text-opacity-50">
            tuongvy@gmail.com
            </p>
          </div>
        </div>
        <button
          onClick={handleEditClick}
          className="p-2.5 text-[1.25rem] text-white bg-[#062D76] rounded-xl"
        >
          {isEditing ? "Lưu" : "Sửa"}
        </button>
      </div>
      {showUploadButton && <UploadButton />}
      <div className="mt-6">
        <h3 className="px-5 py-2.5 text-[1.25rem] text-[#062D76] rounded-lg bg-slate-200 w-fit">
          Thông tin cá nhân
        </h3>
        <div className="grid grid-cols-2 max-sm:gap-6 gap-14 mt-6 max-sm:grid-cols-1">
          <div className="flex flex-col gap-2">
            <label className="text-[1.125rem] text-black">Họ và tên</label>
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
            <label className="text-[1.125rem] text-black">MSSV</label>
            <div className="px-2 py-3 text-[1.125rem] text-black border-b border-black">
              22521701
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[1.125rem] text-black">Gmail</label>
            <div className="px-2 py-3 text-[1.125rem] text-black border-b border-black">
              tuongvy@gmail.com
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[1.125rem] text-black">Ngày sinh</label>
            <div className="px-2 py-3 text-[1.125rem] text-black border-b border-black">
              {isEditing ? (
                <input
                  type="text"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-transparent border-none outline-none"
                />
              ) : (
                dob
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[1.125rem] text-black">Số điện thoại</label>
            <div className="px-2 py-3 text-[1.125rem] text-black border-b border-black">
              {isEditing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent border-none outline-none"
                />
              ) : (
                phone
              )}
            </div>
          </div>
          <div className="flex flex-col self-end gap-2">
            <label className="text-[1.125rem] text-black">Ngày tham gia</label>
            <div className="p-2.5 text-[1.125rem] text-black rounded-lg bg-zinc-400 bg-opacity-50">
              20/08/2023
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BorrowingStats = () => {
  return (
    <div className="mt-6">
      <h3 className="px-5 py-2.5 text-[1.25rem] text-[#062D76] rounded-lg bg-slate-200 w-fit">
        Thông tin mượn sách
      </h3>
      <div className="flex gap-3 mt-6 max-sm:flex-col">
        <article className="flex flex-col flex-1 gap-5 p-5 rounded-xl bg-slate-200">
          <p className="text-[1.25rem] text-[#062D76]">8</p>
          <p className="text-[1.125rem] text-[#062D76]">Tài liệu đang mượn</p>
        </article>
        <article className="flex flex-col flex-1 gap-5 p-5 rounded-xl bg-slate-200">
          <p className="text-[1.25rem] text-[#062D76]">4</p>
          <p className="text-[1.125rem] text-[#062D76]">Tài liệu quá hạn</p>
        </article>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <main className="pt-16 flex">
        <LeftSideBar />
        <section className="self-stretch pr-[1.25rem] md:pl-60 ml-[1.25rem] my-auto w-full max-md:max-w-full mt-2 mb-2">
          <div className="flex flex-col p-5 w-full bg-white rounded-xl max-md:max-w-full">
            <UserInfo />
            <BorrowingStats />
          </div>
        </section>
        <ChatBotButton />
      </main>
    </div>
  );
};

export default page;
