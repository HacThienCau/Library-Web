"use client"
import { Button } from "@/app/components/ui/button";
import useSidebarStore from "@/store/sideBarStore";

import { useRouter, usePathname } from "next/navigation";

const SidebarItem = ({ path, icon, label }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isSidebarOpen, toggleSidebar } = useSidebarStore();

    const isActive = pathname === path;

    const handleClick = () => {
        router.push(path);
        if (isSidebarOpen) {
            toggleSidebar();
        }
    };

    return (
        <Button
            variant="ghost"
            className={`w-full justify-start mb-3 cursor-pointer flex items-center text-[15px] ${isActive ? "text-white bg-[#062D76] " : "text-black bg-transparent"
                }`}
            onClick={handleClick}
        >
            <img
                src={icon}
                alt={label}
                className={`mr-3 w-5 h-6 ${isActive ? "filter brightness-0 invert" : ""}`}
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
            className={`fixed left-0 h-full w-52 p-4 transform bg-white transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col z-50 md:z-0 shadow-lg ${isSidebarOpen ? "translate-x-0  " : "-translate-x-full"
                } ${isSidebarOpen ? "md:hidden" : ""} md:shadow-none`}
        >
            <div className="flex flex-col h-full overflow-y-auto">
                {/* Logo */}
                <div className="flex flex-col items-center mb-4">
                    <img src="/images/logo.jpg" alt="Vibely Logo" className="w-36" />
                </div>
                <hr className="border-t border-gray-100 mb-6" />

                {/* Navigation */}
                <nav className="space-y-3 flex-grow">
                    {menuItems.map((item) => (
                        <SidebarItem key={item.path} {...item} />
                    ))}
                </nav>

                {/* Footer Image */}
                <div className="mt-auto flex flex-col items-center pb-4">
                    <img src="/images/end_sidebar.png" alt="Vibely Logo" className="w-42" />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
