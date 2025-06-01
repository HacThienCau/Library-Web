"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bell, Menu, Search, ShoppingBag, X } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import didYouMean from "didyoumean";
import axios from "axios";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaRss,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Danh mục", href: "/Categories" },
  { name: "Tin sách", href: "/News" },
  { name: "Về chúng tôi", href: "/About" },
];

export const Header = () => {
  const [menuState, setMenuState] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [bookTitles, setBookTitles] = useState([]);
  const [bookAuthors, setBookAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  };

  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    // Lọc sách tên chứa từ khóa (case-insensitive)
    // let filtered = books.filter(
    //   (book) =>
    //     book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     book.author.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    const normalizedTerm = removeVietnameseTones(searchTerm);
    let filtered = books.filter(
      (book) =>
        removeVietnameseTones(book.title).includes(normalizedTerm) ||
        removeVietnameseTones(book.author).includes(normalizedTerm)
    );

    // Nếu không có kết quả thì sửa lỗi chính tả với didyoumean
    // if (filtered.length === 0) {
    //   const correction = didYouMean(searchTerm, bookTitles ) || didYouMean(searchTerm, bookAuthors);
    //   if (correction) {
    //     filtered = books.filter(book => book.title === correction) || books.filter(book => book.author === correction);
    //   }
    // }
    if (filtered.length === 0) {
      // const correctionTitle = didYouMean(searchTerm, bookTitles);
      const correctionTitle = didYouMean(
        normalizedTerm,
        bookTitles.map(removeVietnameseTones)
      );
      // const correctionAuthor = didYouMean(searchTerm, bookAuthors);
      const correctionAuthor = didYouMean(
        normalizedTerm,
        bookAuthors.map(removeVietnameseTones)
      );

      if (correctionTitle) {
        filtered = books.filter((book) => book.title === correctionTitle);
      } else if (correctionAuthor) {
        filtered = books.filter((book) => book.author === correctionAuthor);
      }
    }

    setSuggestions(filtered);
  }, [searchTerm, books, bookTitles, bookAuthors]);

  const MAX_KEYWORDS = 5;

  const saveSearchTermToCache = (term) => {
    if (!term.trim()) return;

    // Lấy danh sách từ khóa hiện tại
    const stored = JSON.parse(localStorage.getItem("searchKeywords") || "[]");

    // Xóa nếu đã tồn tại
    const updated = stored.filter((item) => item !== term);

    // Thêm từ khóa mới vào đầu mảng
    updated.unshift(term);

    // Giới hạn số lượng từ khóa
    const limited = updated.slice(0, MAX_KEYWORDS);

    // Lưu lại vào localStorage
    localStorage.setItem("searchKeywords", JSON.stringify(limited));
  };

  // 3. Khi chọn 1 sách trong gợi ý
  const handleSelect = (book) => {
    setSearchTerm(book.title);
    setSuggestions([]);
    // console.log("Tìm kiếm:", id);
    // handleSearch();
    router.push(`/book-detail/${book.id}`); // Chuyển hướng đến trang sách
  };

  const handleSearch = async () => {
    try {
      let res;

      if (!searchTerm.trim()) {
        res = await axios.get("http://localhost:8081/books");
      } else {
        res = await axios.get("http://localhost:8081/search", {
          params: { query: searchTerm },
        });
      }
      saveSearchTermToCache(searchTerm.trim());
      const data = res?.data || [];

      const convertedBooks = Array.isArray(data)
        ? data.map((book) => ({
            id: book.id,
            imageSrc: book.hinhAnh[0],
            available:
              book.tongSoLuong - book.soLuongMuon - book.soLuongXoa > 0,
            title: book.tenSach,
            author: book.tenTacGia,
            publisher: book.nxb,
            borrowCount: book.soLuongMuon,
          }))
        : [];

      setBooks(convertedBooks);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sách:", error);
      setBooks([]); // Nếu có lỗi cũng để trống
    }
  }
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
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);

    }
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
  setSearchTerm("");
  setSuggestions([]);
  }, [pathname]);

  const isActive = (href) => pathname === href;

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("id");
    router.push("/user-login");
  };

  return (
    <header>
      {/* Topbar */}
      <div className="bg-[#062D76] text-white text-sm px-4 py-1 flex justify-between items-center w-full overflow-hidden lg:px-14">
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
                            ? " font-semibold bg-[#062D76] text-white"
                            : "text-muted-foreground hover:text-sky-900"
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Search bar */}
            {/* <div className="hidden md:flex max-w-xs mx-8 items-center gap-2 ">
                <input
                  type="text"
                  placeholder="Tìm sách ..."
                  className="w-full border border-gray-300 rounded-full px-4 py-1 focus:outline-none"
                />
            <Search color="gray" className="cursor-pointer"/>
              </div> */}
            <div className="group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="relative w-full max-md:max-w-full">
                <div className="flex flex-wrap gap-3 items-center px-3 py-2.5 w-full text-[1.25rem] leading-none text-[#062D76] bg-white backdrop-blur-[100px] min-h-[50px] rounded-[100px]">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/669888cc237b300e928dbfd847b76e4236ef4b5a?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816"
                    alt="Search icon"
                    className="object-contain shrink-0 self-stretch my-auto aspect-square w-[30px]"
                  />
                  <input
                    type="search"
                    id="search-input"
                    placeholder="Tìm kiếm sách"
                    className="flex-1 md:text-[1.25rem] bg-transparent border-none outline-none placeholder-[#062D76] text-[#062D76] focus:ring-2 focus:ring-red-dark focus:ring-opacity-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                </div>

                {suggestions.length > 0 && (
                  <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-[250px] overflow-y-auto">
                    {suggestions.map((book, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleSelect(book)}
                        onMouseDown={(e) => e.preventDefault()}
                        className="px-4 py-2 cursor-pointer hover:bg-[#f2f2f2] transition-colors"
                      >
                        <strong>{book.title}</strong>
                        {book.author && ` — ${book.author}`}
                      </li>
                    ))}
                  </ul>
                )}
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

              <div className="flex flex-grow items-center gap-6">
                <Link href="/cart">
                <ShoppingBag color="gray" className="cursor-pointer" />
                </Link>
                <Link href="/notification">
                <Bell color="gray" className="cursor-pointer" />
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-full border"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={userInfo?.avatarUrl} alt="avatar" />
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem
                      onClick={() => router.push(`/user-profile`)}
                    >
                      <img
                        src="/images/profile.png"
                        alt="setting"
                        className="mr-0 h-5"
                      />
                      <span className="ml-2 font-semibold">Hồ sơ</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/settings`)}>
                      <img
                        src="/images/setting.png"
                        alt="setting"
                        className="mr-0 h-5"
                      />
                      <span className="ml-2 font-semibold">Cài đặt</span>
                    </DropdownMenuItem>

                    {/* Phiếu giao dịch có submenu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <DropdownMenuItem className="justify-between">
                          <div className="flex items-center">
                            <img
                              src="/images/mail.png"
                              alt="mail"
                              className="ml-0.5 h-3.5"
                            />
                            <span className="ml-4 font-semibold">Quản lý</span>
                          </div>
                          <svg
                            className="ml-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </DropdownMenuItem>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-40 left-full top-0 mt-[-4px]">
                        <DropdownMenuItem
                          onClick={() => router.push(`/borrowed-card`)}
                        >
                          Phiếu mượn
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/fine`)}>
                          Phiếu phạt
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <img
                        src="/images/logout.png"
                        alt="logout"
                        className="mr-0 h-5"
                      />
                      <span className="ml-2 font-semibold">Đăng xuất</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};
