"use client";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { ArrowUpFromLine, ChevronDown, CircleCheck, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ThreeDot } from "react-loading-indicators";

function page() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const handleGoBack = () => {
    route.back();
  };
  const [categoryName, setCategoryName] = useState(""); // Tên danh mục cha
  const [categoryChillName, setCategoryChillName] = useState(""); // Tên danh mục con
  const [location, setLocation] = useState(""); // Vị trí để sách

  const handleSubmit = async () => {
    if (
      categoryName === "" ||
      categoryChillName === "" ||
      location === ""
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
  
    setLoading(true);
    const categoryData = {
      tenTheLoaiCha: categoryName,
      tenTheLoaiCon: categoryChillName,
      viTri: location,
    };
  
    try {
      const res = await fetch("https://library-backend-ydnf.onrender.com/addCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });
  
      const message = await res.text(); // lấy đúng chuỗi từ backend
  
      if (!res.ok) {
        // Báo lỗi dựa trên thông điệp backend trả về
        toast.error(message || "⚠️ Có lỗi xảy ra");
        setLoading(false);
        return;
      }
  
      // Thành công
      toast.success("✅ " + message);
      setLoading(false);
      handleGoBack();
    } catch (error) {
      console.error("Lỗi:", error.message);
      toast.error("⚠️ Lỗi khi thêm thể loại: " + error.message);
      setLoading(false);
    }
  };  

  return (
    <div className="flex flex-row w-full h-full min-h-screen bg-[#EFF3FB] pb-15">
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
        <div className="flex w-full flex-col py-6 md:ml-52 relative mt-10 gap-2 items-center px-10">
          {/*Nút Back*/}
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
          {/*Dòng tên danh mục cha*/}
          <div className="flex flex-col w-full gap-[5px] md:gap-[10px]">
            <p className="font-semibold text-lg mt-3">Tên Danh mục cha</p>
            <Input
              type="text"
              placeholder="Nhập tên danh mục cha"
              className="font-semibold rounded-lg w-full h-10 flex items-center px-5 bg-white"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          {/*Dòng tên danh mục con*/}
          <div className="flex flex-col w-full gap-[5px] md:gap-[10px]">
            <p className="font-semibold text-lg mt-3">Tên Danh mục con</p>
            <Input
              type="text"
              placeholder="Nhập tên danh mục con"
              className="font-semibold rounded-lg w-full h-10 flex items-center px-5 bg-white"
              value={categoryChillName}
              onChange={(e) => setCategoryChillName(e.target.value)}
            />
          </div>
          {/*Dòng tên vị trí*/}
          <div className="flex flex-col w-full gap-[5px] md:gap-[10px]">
            <p className="font-semibold text-lg mt-3">Vị trí</p>
            <Input
              type="text"
              placeholder="Nhập vị trí để sách"
              className="font-semibold rounded-lg w-full h-10 flex items-center px-5 bg-white"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="w-full bottom-0 px-10 left-0 md:left-52 md:w-[calc(100%-208px)] fixed h-18 bg-white flex items-center justify-between">
            {/*Control Bar*/}
            <div></div>
            <Button
              title={"Hoàn Tất"}
              className={`rounded-3xl w-40 h-12 bg-[#062D76]`}
              onClick={() => {
                handleSubmit();
              }}
            >
              <CircleCheck className="w-12 h-12" color="white" />
              Hoàn Tất
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;