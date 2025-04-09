"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useSidebarStore from "@/store/sidebarStore";

import {
  Bell,
  BookText,
  CircleAlert,
  LockKeyhole,
  LogOut,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LeftSideBar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const router = useRouter();

  const [activeButton, setActiveButton] = React.useState("");
  useEffect(() => {
    const storedActiveButton = localStorage.getItem("activeButton");
    if (storedActiveButton) {
      setActiveButton(storedActiveButton); 
    }
  }, []);

  const handleNavigation = (path) => {
    setActiveButton(path); 
    localStorage.setItem("activeButton", path); 
    router.push(path);
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <aside
      className={`fixed bg-white top-16 left-0 h-full mt-2 w-64 p-4 transform transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col z-50 md:z-0 rounded-r-xl rounded-br-xl ${
        isSidebarOpen
          ? "translate-x-0 bg-white shadow-lg "
          : " -translate-x-full"
      } ${isSidebarOpen ? "md:hidden" : ""} md:shadow-none`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Navigation menu */}
        <nav className="space-y-4 flex-grow">
          <Button
            variant="ghost"
            className={`flex justify-start cursor-pointer w-full ${
              activeButton === "/user-profile"
                ? "bg-[#062D76] text-white"
                : "focus:bg-[#062D76] focus:text-white"
            }`}
            onClick={() => handleNavigation("/user-profile")}
          >
            <User className="mr-4" /> Hồ sơ cá nhân
          </Button>

          <Button
            variant="ghost"
            className={`flex justify-start cursor-pointer w-full ${
              activeButton === "/borrowed-books"
                ? "bg-[#062D76] text-white"
                : " focus:bg-[#062D76] focus:text-white"
            }`}
            onClick={() => handleNavigation("/borrowed-books")}
          >
            <BookText className="mr-4" /> Sách đang mượn
          </Button>

          <Button
            variant="ghost"
            className={`flex justify-start cursor-pointer w-full ${
              activeButton === "/overdue-books"
                ? "bg-[#062D76] text-white"
                : " focus:bg-[#062D76] focus:text-white"
            }`}
            onClick={() => handleNavigation("/overdue-books")}
          >
            <CircleAlert className="mr-4" /> Sách quá hạn
          </Button>

          <Button
            variant="ghost"
            className={`flex justify-start cursor-pointer w-full ${
              activeButton === "/change-password"
                ? "bg-[#062D76] text-white"
                : " focus:bg-[#062D76] focus:text-white"
            }`}
            onClick={() => handleNavigation("/change-password")}
          >
            <LockKeyhole className="mr-4" /> Đổi mật khẩu
          </Button>
        </nav>

        {/* Footer section */}
        <div className="mb-16">
          <Separator className="my-4" />
          <div className="text-xs text-muted-foreground space-y-1">
            <Button variant="ghost" className="cursor-pointer -ml-4 w-full ">
              <LogOut />{" "}
              <span className="ml-2 font-bold text-md">Đăng xuất</span>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
