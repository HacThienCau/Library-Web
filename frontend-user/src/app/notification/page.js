"use client";
import React, { useState, useEffect } from "react";
import LeftSideBar from "../components/LeftSideBar";
import ChatBotButton from "../components/ChatBotButton";
import { FaCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { ThreeDot } from "react-loading-indicators";

const NotiCard = ({ id, message, timestamp, read , refreshNoti}) => {
  const dateObj = new Date(timestamp);

  const formattedDate = dateObj.toLocaleDateString("vi-VN");  
  const formattedTime = dateObj.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });  
  const formattedMessage = message.split("\n").join("<br />");
  const handleMarkAsRead = async () => {
    if (!read) {
      try {
        await fetch(`https://library-backend-ydnf.onrender.com/notification/mark-as-read/${id}`, {
          method: "PUT",
        });
        toast.success("Đã đánh dấu là đã đọc!");
        refreshNoti();   // Gọi lại hàm fetch để cập nhật danh sách
      } catch (err) {
        toast.error("Lỗi khi đánh dấu đã đọc");
      }
    }
  };
  return (
    <article className="flex items-center gap-4 p-4 bg-white backdrop-blur-2xl  rounded-lg shadow-sm border hover:shadow-md transition cursor-pointer"
      onClick={handleMarkAsRead}>
      { !read ? (
    <>
      <FaCircle className="text-red-500 text-xs mt-1" title="Đánh dấu là đã đọc" />
      <div className="flex flex-col">
        <p className="text-[1.125rem] text-[#131313]/90" dangerouslySetInnerHTML={{ __html: formattedMessage }}></p>
        <span className="text-sm text-gray-500 mt-1">
          {formattedDate} lúc {formattedTime}
        </span>
      </div>
    </>
  ) : (
    <div className="flex flex-col">
      <p className="text-[1.125rem] text-[#131313]/50" dangerouslySetInnerHTML={{ __html: formattedMessage }}></p>
      <span className="text-sm text-gray-500 mt-1">
        {formattedDate} lúc {formattedTime}
      </span>
    </div>
  )}
    </article>
  );
};

const Page = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const userId = localStorage.getItem("id");
  console.log(userId);
      const fetchNotification = async () => {
      try {
        const response = await fetch(
          `https://library-backend-ydnf.onrender.com/notification/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          toast.error("Lỗi khi lấy thông báo");
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi fetch thông báo");
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {


    if (userId) fetchNotification();
  }, [userId]);
  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <main className="pt-16 flex">
       
        <section className="self-stretch pr-[1.25rem] ml-[1.25rem] my-auto w-full max-md:max-w-full mt-8 mb-2">
          <div className="flex flex-col p-5 w-full bg-white rounded-xl max-md:max-w-full">
            <div className="flex items-center justify-center gap-3">
              <h2 className="gap-2.5 self-center px-[1.25rem] py-[0.625rem] text-[1.5rem] text-[#062D76] font-semibold rounded-lg">
                Thông báo
              </h2>
            </div>
            {loading ? (
              <div className="flex justify-center items-center">
                <ThreeDot
                  color="#062D76"
                  size="large"
                  text="Đang tải thông báo..."
                  variant="bounce"
                  textColor="#062D76"
                />
              </div>
            ) : notifications.length > 0 ? (
              <div className="flex flex-col gap-4">
                {notifications.map((item) => (
                  <NotiCard
                    key={item.id}
                    id={item.id}
                    message={item.message}
                    timestamp={item.timestamp}
                    read={item.read}
                    refreshNoti={fetchNotification}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Bạn không có thông báo nào.
              </p>
            )}
          </div>
        </section>
        {/* <ChatBotButton /> */}
      </main>
    </div>
  );
};

export default Page;
