"use client";
import React, { useState, useEffect } from "react";
import LeftSideBar from "../components/LeftSideBar";
import ChatBotButton from "../components/ChatBotButton";
import toast from "react-hot-toast";
import axios from "axios";

const Page = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
const userId = localStorage.getItem("id");
    useEffect(() => {
    if (userId) {
      fetchUserInfo(userId);
    }
  }, [userId]);

  const fetchUserInfo = async (id) => {
    try {
      const response = await axios.get(`https://library-backend-ydnf.onrender.com/user/${id}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  // Hàm toggle hiển thị mật khẩu
  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === "currentPassword") {
      setShowCurrentPassword((prev) => !prev);
    } else if (passwordType === "newPassword") {
      setShowNewPassword((prev) => !prev);
    } else if (passwordType === "confirmPassword") {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onSubmit = async () => {
    if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      const response = await axios.put(
        `https://library-backend-ydnf.onrender.com/user/${userId}/change-password`,
        {
          oldPassword: data.currentPassword,
          newPassword: data.newPassword,
        }
      );

      if (response.status === 200) {
        setOldPasswordError("");
        alert("Đổi mật khẩu thành công");
        setData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data === "Mật khẩu cũ không đúng") {
          setOldPasswordError("Mật khẩu cũ không đúng, vui lòng nhập lại");
        } else {
          // lỗi khác
          setOldPasswordError("");
          alert(error.response.data);
        }
      } else {
        setOldPasswordError("");
        alert("Lỗi khi gọi API đổi mật khẩu");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <main className="pt-16 flex">
     
        <section className="self-stretch pr-[1.25rem] ml-[1.25rem] my-auto w-full max-md:max-w-full mt-8 mb-2">
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
                  <p className="text-[1.125rem] text-[#131313]/50 text-opacity-50">
                    {userInfo?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              {/* Current Password */}
              <div className="flex flex-col mt-8 w-full max-md:max-w-full">
                <label
                  htmlFor="currentPassword"
                  className="text-[1rem] xl:text-[1.25rem] font-medium text-black max-md:max-w-full"
                >
                  Mật khẩu hiện tại
                </label>
                <div className="flex gap-2.5 justify-center items-center px-[8px] py-[8px] mt-2 w-full border border-[#041B47] border-solid md:min-h-[3.25rem] min-h-[2rem] max-md:max-w-full">
                  <input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={data.currentPassword}
                    onChange={(e) => {
                      setOldPasswordError(""); // xóa lỗi khi người dùng nhập lại
                      handleChange(e);
                    }}
                    autoComplete="off"
                    className="flex-1 bg-transparent border-none outline-none text-black"
                  />
                  <img
                    loading="lazy"
                    src={
                      showCurrentPassword ? "/icon/Show.svg" : "/icon/Hide.svg"
                    }
                    alt="eye icon"
                    className="object-contain self-stretch my-auto w-6 aspect-square cursor-pointer"
                    onClick={() => togglePasswordVisibility("currentPassword")}
                  />
                </div>
                {oldPasswordError && (
                  <p className="text-red-600 text-sm mt-1">
                    {oldPasswordError}
                  </p>
                )}
              </div>
              {/* New Password */}
              <div className="flex flex-col mt-8 w-full max-md:max-w-full">
                <label
                  htmlFor="newPassword"
                  className="text-[1rem] xl:text-[1.25rem] font-medium text-black max-md:max-w-full"
                >
                  Mật khẩu mới
                </label>
                <div className="flex gap-2.5 justify-center items-center px-[8px] py-[8px] mt-2 w-full border border-[#041B47] border-solid md:min-h-[3.25rem] min-h-[2rem] max-md:max-w-full">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={data.newPassword}
                    onChange={handleChange}
                    autoComplete="off"
                    className="flex-1 bg-transparent border-none outline-none text-black"
                  />
                  <img
                    loading="lazy"
                    src={showNewPassword ? "/icon/Show.svg" : "/icon/Hide.svg"}
                    alt="eye icon"
                    className="object-contain self-stretch my-auto w-6 aspect-square cursor-pointer"
                    onClick={() => togglePasswordVisibility("newPassword")}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col mt-8 w-full max-md:max-w-full">
                <label
                  htmlFor="confirmPassword"
                  className="text-[1rem] xl:text-[1.25rem] font-medium text-black max-md:max-w-full"
                >
                  Xác nhận mật khẩu
                </label>
                <div className="flex gap-2.5 justify-center items-center px-[8px] py-[8px] mt-2 w-full border border-[#041B47] border-solid md:min-h-[3.25rem] min-h-[2rem] max-md:max-w-full">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={data.confirmPassword}
                    onChange={handleChange}
                    autoComplete="off"
                    className="flex-1 bg-transparent border-none outline-none text-black"
                  />
                  <img
                    loading="lazy"
                    src={
                      showConfirmPassword ? "/icon/Show.svg" : "/icon/Hide.svg"
                    }
                    alt="eye icon"
                    className="object-contain self-stretch my-auto w-6 aspect-square cursor-pointer"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  />
                </div>
              </div>
              <div className="justify-center self-center">
                <button
                  type="button"
                  className="justify-center self-center p-2.5 mt-7 text-[1rem] text-white bg-[#062D76] hover:bg-blue-950 font-medium rounded-xl cursor-pointer"
                  onClick={onSubmit}
                >
                  Cập nhật tài khoản
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* <ChatBotButton /> */}
      </main>
    </div>
  );
};

export default Page;
