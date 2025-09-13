"use client";

import React, { useEffect, useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import BookCard from "../components/BookCard";
import CollectionCard from "./CollectionCard";
import ServiceHoursCard from "./ServiceHoursCard";
import ChatBotButton from "../components/ChatBotButton";
import axios from "axios";
import didYouMean from "didyoumean";
import Head from "next/head";
import { Header } from "@/app/components/Header";

// const books = [
//   {
//     id: "DRPN001",
//     imageSrc:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/9b777cb3ef9abb920d086e97e27ac4f6f3559695",
//     available: true,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     id: "DRPN002",
//     imageSrc:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/fc01b7cf44e0ca2f23258dcc0ad69329b2612af0?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: false,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     id: "DRPN003",
//     imageSrc:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/5e8a0f3fd4681a9512313c2c1c6dae1285bcf0a6?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: true,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     id: "DRPN004",
//     imageSrc:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/d854294877ea4263cf3494a98eecfd64cd148327?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: false,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     id: "DRPN005",
//     imageSrc:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/acf848c9260bfc86d1f9094e17e14ec25f3ec193?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: true,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     id: "DRPN006",
//     imageSrc:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/d854294877ea4263cf3494a98eecfd64cd148327?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: false,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
// ];

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [booksSuggest, setBooksSuggest] = useState([]); // mảng sách {title, ...}
  const [bookTitles, setBookTitles] = useState([]); // mảng tên sách dạng string
  const [bookAuthors, setBookAuthors] = useState([]); // mảng tên tác giả dạng string
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
    // gọi API lấy toàn bộ sách
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://library-backend.onrender.com/books"); // đổi thành URL thật
        // console.log("Dữ liệu sách:", response.data);
        const convertedBooks = response.data.map((book) => ({
          id: book.id,
          imageSrc: book.hinhAnh[0],
          available: book.tongSoLuong - book.soLuongMuon - book.soLuongXoa > 0,
          title: book.tenSach,
          author: book.tenTacGia,
          publisher: book.nxb,
          borrowCount: book.soLuongMuon,
        }));
        setBooks(convertedBooks);
        setBookTitles(convertedBooks.map((book) => book.title));
        setBookAuthors(convertedBooks.map((book) => book.author));
      } catch (error) {
        console.error("Lỗi khi fetch sách:", error);
      }
    };

    fetchBooks();

    const fetchBooksSuggest = async () => {
      try {
        const userId = localStorage.getItem("id"); // thay bằng userId thật của bạn
        const searchKeywords = localStorage.getItem("searchKeywords"); // mảng keyword ví dụ
        const keywords = searchKeywords ? JSON.parse(searchKeywords) : [];

        const response = await axios.post("https://library-backend.onrender.com/suggest", {
          userId: userId,
          keywords: keywords,
        });
        // console.log("Dữ liệu sách:", response.data);
        const convertedBooks = response.data.map((book) => ({
          id: book.id,
          imageSrc: book.hinhAnh[0],
          available: book.tongSoLuong - book.soLuongMuon - book.soLuongXoa > 0,
          title: book.tenSach,
          author: book.tenTacGia,
          publisher: book.nxb,
          borrowCount: book.soLuongMuon,
        }));
        setBooksSuggest(convertedBooks);
      } catch (error) {
        console.error("Lỗi khi fetch sách:", error);
      }
    };

    fetchBooksSuggest();
  }, []);

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
  const handleSelect = (title) => {
    setSearchTerm(title);
    setSuggestions([]);
    console.log("Tìm kiếm:", title);
    handleSearch();
  };

  const handleSearch = async () => {
    try {
      let res;

      if (!searchTerm.trim()) {
        res = await axios.get("https://library-backend.onrender.com/books");
      } else {
        res = await axios.get("https://library-backend.onrender.com/search", {
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
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <main className="pt-16 flex">
        <Header />
    
        <section className="self-stretch pr-[1.25rem] ml-[1.25rem] my-auto w-full max-md:max-w-full mt-8 mb-2">
          {/* <div className="relative flex flex-wrap gap-3 items-center px-3 py-2.5 w-full text-[1.25rem] leading-none text-[#062D76] bg-white backdrop-blur-[100px] min-h-[50px] rounded-[100px] max-md:max-w-full">
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
            {suggestions.length > 0 && (
              //
              <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-[250px] overflow-y-auto">
                {suggestions.map((book, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelect(book.title)}
                    onMouseDown={(e) => e.preventDefault()}
                    style={{
                      padding: "8px 16px",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f2f2f2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <strong>{book.title}</strong>
                    {book.author && ` — ${book.author}`}
                  </li>
                ))}
              </ul>
            )}
          </div> */}
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
                    onClick={() => handleSelect(book.title)}
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

          <div className="flex lg:flex-row justify-between flex-col gap-3.5 mt-5 w-full max-md:max-w-full">
            <ServiceHoursCard />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3.5 items-center mt-3 lg:w-2/3 h-full self-stretch max-md:max-w-full">
              <CollectionCard
                title="Tài liệu số"
                category="Bộ sưu tập"
                imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/9b777cb3ef9abb920d086e97e27ac4f6f3559695"
                bgColor="bg-teal-500"
                buttonTextColor="text-teal-500"
              />
              <CollectionCard
                title="Sách"
                category="Bộ sưu tập"
                imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/9b777cb3ef9abb920d086e97e27ac4f6f3559695"
                bgColor="bg-sky-600"
                buttonTextColor="text-sky-600"
              />
            </div>
          </div>
          <section className="flex flex-col p-5 mt-3 w-full bg-white rounded-xl max-md:max-w-full">
            <h2 className="gap-2.5 self-start px-5 py-2.5 text-[1.25rem] text-white bg-[#062D76] rounded-lg">
              Có thể bạn sẽ thích
            </h2>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-10 items-start mt-5 w-full max-md:max-w-full">
              {booksSuggest.map((book, index) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  imageSrc={book.imageSrc}
                  available={book.available}
                  title={book.title}
                  author={book.author}
                  publisher={book.publisher}
                  borrowCount={book.borrowCount}
                />
              ))}
            </div>
          </section>
          <section className="flex flex-col p-5 mt-3 w-full bg-white rounded-xl max-md:max-w-full">
            <h2 className="gap-2.5 self-start px-5 py-2.5 text-[1.25rem] text-white bg-[#062D76] rounded-lg">
              Sách mới về
            </h2>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-10 items-start mt-5 w-full max-md:max-w-full">
              {books.map((book, index) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  imageSrc={book.imageSrc}
                  available={book.available}
                  title={book.title}
                  author={book.author}
                  publisher={book.publisher}
                  borrowCount={book.borrowCount}
                />
              ))}
            </div>
          </section>
        </section>
        {/* <ChatBotButton /> */}
      </main>
    </div>
  );
};

export default HomePage;
