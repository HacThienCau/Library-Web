"use client";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useSidebarStore from "@/store/sideBarStore";
import { LogOut } from "lucide-react";

import { useRouter, usePathname } from "next/navigation";

const SidebarItem = ({ path, icon, label }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();

  const isActive = pathname.includes(path);

  const handleClick = () => {
    router.push(path);
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start mb-3 cursor-pointer py-3 flex items-center text-[16px] ${
        isActive
          ? "bg-[#1D3C69] text-white font-semibold hover:bg-[#1D3C69] hover:text-white "
          : "text-[#171717] bg-transparent font-medium active:bg-[#1D3C69] active:text-white"
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
    { path: "/dashboard", icon: "/svg/dashboard.svg", label: "Dashboard" },
    { path: "/users", icon: "/svg/user_admin.svg", label: "Người dùng" },
    { path: "/books", icon: "/svg/book_admin.svg", label: "Sách" },
    { path: "/borrow", icon: "/svg/return_admin.svg", label: "Mượn/Trả" },
    { path: "/fine", icon: "/svg/fine_admin.svg", label: "Phiếu phạt" },
    { path: "/setting", icon: "/svg/setting.svg", label: "Cài đặt" },
  ];

  return (
    <aside
      className={`fixed left-0 h-full w-52 pb-4 px-2 rounded-tr-xl transform bg-white/80 transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col z-50 md:z-0 shadow-lg ${
        isSidebarOpen ? "translate-x-0  " : "-translate-x-full"
      } ${isSidebarOpen ? "md:hidden" : ""} md:shadow-none`}
    >
      <div className="flex flex-col h-full justify-start overflow-y-auto">
        {/* Logo */}
        <div className="flex justify-center items-center my-2">
          <img src="/images/logo.jpg" alt="ReadHub Logo" className="w-10 items-stretch rounded-full" />
          <h1 className="text-lg font-bold text-[#062D76] mt-2">
            ReadHub
          </h1>
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
          <div className="flex justify-center text-xs text-muted-foreground space-y-1">
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
