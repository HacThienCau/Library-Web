"use client";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useSidebarStore from "@/store/sideBarStore";
import { LogOut } from "lucide-react";
import Image from "next/image";

import { useRouter, usePathname } from "next/navigation";

const SidebarItem = ({ path, icon, label }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();

  const isActive = path === "/" 
  ? pathname === "/" || pathname === "/dashboard"
  : pathname.includes(path);

  const handleClick = () => {
    router.push(path);
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start mb-3 cursor-pointer font-medium py-3 flex items-center text-[16px] ${
        isActive
          ? "bg-[#062D76] text-white hover:bg-[#062D76] hover:text-white "
          : "text-[#131313]/90 bg-transparent active:bg-[#062D76] active:text-white"
      }`}
      onClick={handleClick}
    >
      <img
        src={icon}
        alt={label}
        className={`mr-3 w-5 h-6 ${
          isActive ? "filter brightness-0 invert" : ""
        }`}
      />
      <span>{label}</span>
    </Button>
  );
};
const Sidebar = () => {
  const { isSidebarOpen } = useSidebarStore();

  const menuItems = [
    { path: "/", icon: "/svg/dashboard.svg", label: "Trang chủ" },
    { path: "/users", icon: "/svg/user_admin.svg", label: "Người dùng" },
    { path: "/books", icon: "/svg/book_admin.svg", label: "Sách" },
    { path: "/borrow", icon: "/svg/return_admin.svg", label: "Mượn/Trả" },
    { path: "/fine", icon: "/svg/fine_admin.svg", label: "Phiếu phạt" },
    { path: "/setting", icon: "/svg/setting.svg", label: "Cài đặt" },
  ];

  return (
    <aside
      className={`fixed left-0 h-full w-52 pb-4 px-2 rounded-tr-xl transform bg-white/80 transition-transform duration-200 ease-in-out md:translate-x-0 flex border-1 flex-col z-50 md:z-0 shadow-lg ${
        isSidebarOpen ? "translate-x-0  " : "-translate-x-full"
      } ${isSidebarOpen ? "md:hidden" : ""} md:shadow-none`}
    >
      <div className="flex flex-col h-full justify-start overflow-y-auto">
        {/* Logo */}
        <div className="flex justify-start items-center my-2">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={35}
            height={35}
            className="w-auto justify-start bg-transparent object-cover border-2 mr-1 rounded-full"
          />
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
            ReadHub
          </div>
        </div>
        <hr className="border-t border-[#EDEEF3] mb-6" />

        {/* Navigation */}
        <nav className="space-y-3 flex-grow">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </nav>

        <div className="mb-16">
          <Separator className="my-4" />
          <div className="flex justify-center text-xs text-[#384459] space-y-1">
            <Button variant="ghost" className="cursor-pointer -ml-4 ">
              <LogOut />{" "}
              <span className="ml-2 font-medium text-[16px]">Đăng xuất</span>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
