"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, Search,  X } from "lucide-react";
import { useScroll, motion } from "framer-motion";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaRss,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const menuItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Danh mục", href: "/Categories" },
  { name: "Tin sách", href: "/News" },
  { name: "Về chúng tôi", href: "/About" },
];

export const HeaderGuest = () => {
  const [menuState, setMenuState] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const isActive = (href) => pathname === href;

  return (
    <header>
      {/* Topbar */}
      <div className="bg-sky-600 text-white text-sm px-4 py-1 flex justify-between items-center w-full overflow-hidden lg:px-14">
        {/* Left - Socials + Marquee */}
          <div className="flex gap-4 text-lg">
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
            <FaRss />
          </div>

         {/* Marquee / text scroll */}
          <div className="whitespace-nowrap overflow-hidden relative w-[250px] sm:w-[400px] md:w-[600px]">
            <div className="animate-marquee inline-block">
              <span>
                Chào mừng bạn đến với ReadHub. Nếu bạn cần giúp đỡ, hãy liên hệ
                chúng tôi!
              </span>
            </div>
          </div>

        {/* Right - Contact Info */}
        <div className="hidden sm:flex gap-4 items-center text-white text-sm">
          <div className="flex items-center gap-1">
            <FaPhone /> <span>(+84) 909707442</span>
          </div>
          <div className="flex items-center gap-1">
            <FaEnvelope /> <span>support@readhub.vn</span>
          </div>
        </div>
      </div>
      <nav
        data-state={menuState && "active"}
        className="group fixed z-20 w-full"
      >
        <div
          className={cn(
            "bg-white mx-auto px-6 transition-all duration-300 lg:px-12",
            scrolled && "bg-background/50 backdrop-blur-2xl -mt-7"
          )}
        >
          <motion.div
            key={1}
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-3",
              scrolled && "lg:py-2"
            )}
          >
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={45}
                  height={45}
                  className="w-auto rounded-full"
                />
                <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
                  ReadHub
                </div>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-md font-medium">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block duration-150 px-3 py-1 rounded-md",
                          isActive(item.href)
                            ? "text-sky-600 border border-sky-700 font-semibold"
                            : "text-muted-foreground hover:text-sky-500"
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block duration-150 px-3 py-1 rounded-md",
                          isActive(item.href)
                            ? "text-sky-600 border border-sky-700 font-semibold"
                            : "text-muted-foreground hover:text-accent-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Search bar */}
              <div className="hidden md:flex flex-grow max-w-md mx-8 items-center gap-2">
                <input
                  type="text"
                  placeholder="Tìm sách ..."
                  className="w-full border border-gray-300 rounded-full px-4 py-1 focus:outline-none"
                />
                <Search color="gray" className="cursor-pointer"/>
              </div>
              {/* Nút đăng nhập  */}
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button  asChild variant="outline" size="sm">
                  <Link href="/user-login">
                    <span>Đăng nhập</span>
                  </Link>
                </Button>
           
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};
