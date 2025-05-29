"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import axios from "axios";
import { ChevronRight } from "lucide-react";

import BookSection from "./BookSection";
import ImageCarousel from "./ImageCarousel";
import BookCard from "./BookCard";

const bookData = [
  {
    title: "Sách mới",
    slug: "sach-moi",
    books: [
      {
        title: "Hội Kí Vanitas - Tập 10",
        image: "/books/vanitas10.jpg",
        status: "Còn sẵn",
        rating: 5,
      },
      {
        title: "Conan - Tập 101",
        image: "/books/conan101.jpg",
        status: "Còn sẵn",
        rating: 4,
      },
    ],
  },
  {
    title: "Sách phổ biến",
    slug: "sach-pho-bien",
    books: [
      {
        title: "Nhà Giả Kim",
        image: "/sach/nhagiakim.jpg",
        status: "Còn sẵn",
        rating: 5,
      },
      {
        title: "Tư Duy Mở",
        image: "/sach/tuduymo.png",
        status: "Còn sẵn",
        rating: 4,
      },
    ],
  },
  {
    title: "Văn học",
    slug: "van-hoc",
    books: [
      {
        title: "Conan - Tập 102",
        image: "/banner/img1.webp",
        status: "Còn sẵn",
        rating: 4,
      },
      {
        title: "Vanitas - Tập 4",
        image: "/books/vanitas4.jpg",
        status: "Còn sẵn",
        rating: 5,
      },
    ],
  },
  {
    title: "Tâm lí - Kĩ năng sống",
    slug: "tam-li-ki-nang-song",
    books: [
      {
        title: "Atomic Habits",
        image: "/books/atomichabits.jpg",
        status: "Còn sẵn",
        rating: 5,
      },
    ],
  },
  {
    title: "Manga - Comic",
    slug: "manga",
    books: [
      {
        title: "Atomic Habits",
        image: "/books/atomichabits.jpg",
        status: "Còn sẵn",
        rating: 5,
      },
    ],
  },
];

const booksSuggestion = [
  {
    id: "67f8c8d65c33de140dd64945",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/fc01b7cf44e0ca2f23258dcc0ad69329b2612af0?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
    available: false,
    title: "Nam cao",
    author: "Văn học",
    publisher: "Văn học Việt Nam (2019)",
    borrowCount: 120,
  },
  {
    id: "67f8cc9e992d1428466da86a",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/5e8a0f3fd4681a9512313c2c1c6dae1285bcf0a6?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
    available: true,
    title: "Nam cao",
    author: "Văn học",
    publisher: "Văn học Việt Nam (2019)",
    borrowCount: 120,
  },
  {
    id: "67f8cfec992d1428466da8a0",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d854294877ea4263cf3494a98eecfd64cd148327?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
    available: false,
    title: "Nam cao",
    author: "Văn học",
    publisher: "Văn học Việt Nam (2019)",
    borrowCount: 120,
  },
  {
    id: "67f8cee9992d1428466da893",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/acf848c9260bfc86d1f9094e17e14ec25f3ec193?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
    available: true,
    title: "Nam cao",
    author: "Văn học",
    publisher: "Văn học Việt Nam (2019)",
    borrowCount: 120,
  },
  {
    id: "67fc78578accbf609e1fd950",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d854294877ea4263cf3494a98eecfd64cd148327?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
    available: false,
    title: "Nam cao",
    author: "Văn học",
    publisher: "Văn học Việt Nam (2019)",
    borrowCount: 120,
  },
];

export function HeroSection() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [booksSuggest, setBooksSuggest] = useState([]); // mảng sách {title, ...}
  const [bookTitles, setBookTitles] = useState([]); // mảng tên sách dạng string
  const [bookAuthors, setBookAuthors] = useState([]); // mảng tên tác giả dạng string
  const [suggestions, setSuggestions] = useState([]);
  const [newBooks, setNewBooks] = useState([]);

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
        const response = await axios.get("http://localhost:8081/books"); // đổi thành URL thật
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

        const response = await axios.post("http://localhost:8081/suggest", {
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
    console.log("Dữ liệu sách gợi ý:", booksSuggest);

    const fetchNewBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8081/books/newest");
      setNewBooks(res.data);
    } catch (error) {
      console.error("Lỗi khi fetch sách mới:", error);
    }
  };
  fetchNewBooks();
  console.log("Dữ liệu sách mới:", newBooks);
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
  };
  return (
    <>
      <main className="overflow-x-hidden">
        <section>
          <div className="pt-22 ">
            <ImageCarousel />
          </div>
        </section>
        {/* Có thể bạn sẽ thích */}
        <div className="px-4 py-6 border-t border-b border-sky-600 mt-10 ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-sky-700 ">
              Có thể bạn sẽ thích
            </h2>
            <a
              href="/suggested"
              className="text-sky-700 hover:underline flex items-center"
            >
              Xem thêm <span className="ml-1">➔</span>
            </a>
          </div>

          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {/* {[
              {
                title: "Dám bị ghét",
                image:
                  "https://tiki.vn/blog/wp-content/uploads/2024/08/dam-bi-ghet-3.jpg",
              },
              {
                title: "Đắc nhân tâm",
                image:
                  "https://nhasachphuongnam.com/images/detailed/217/dac-nhan-tam-bc.jpg",
              },
              {
                title: "Sapiens",
                image:
                  "https://pos.nvncdn.com/fd5775-40602/ps/20240406_W0tedT95s7.jpeg",
              },
              {
                title: "Tâm lý học hành vi",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-OVbBcoqmgF3wBUGdB72sJqxj118br0bXAQ&s",
              },
              {
                title: "Thiên nga đen",
                image:
                  "https://bizweb.dktcdn.net/100/197/269/products/thien-nga-den-1.png?v=1581061915587",
              },
            ].map((book, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center min-w-[100px]"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm"
                />
                <p className="mt-2 text-center text-sm font-medium text-gray-800">
                  {book.title}
                </p>
              </div>
            ))} */}
          </div>
          <style>{`
    @keyframes scroll-left {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-66.6667%);
      }
    }
  `}</style>

          <div className="flex flex-col gap-4 px-5 md:px-10">
            <div className="overflow-hidden relative w-full">
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  width: "max-content",
                  animation: "scroll-left 30s linear infinite",
                }}
              >
                {(() => {
                  const booksArray =
                    booksSuggest && booksSuggest.length > 0
                      ? booksSuggest
                      : booksSuggestion;
                  const tripledBooks = [
                    ...booksArray,
                    ...booksArray,
                    ...booksArray,
                    ...booksArray,
                  ];
                  return tripledBooks.map((book, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-[250px] flex flex-col items-center"
                    >
                      <img
                        src={book.imageSrc}
                        alt={book.title}
                        className="w-full h-auto rounded-lg"
                        onClick={() =>
                          (window.location.href = `/book-detail/${book.id}`)
                        }
                      />
                      <p className="mt-2 text-center text-base font-semibold">
                        {book.title}
                      </p>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-15">
          {bookData.map((section, idx) => (
            <React.Fragment key={idx}>
              {/* Banner trước mục 'Văn học' */}
              {section.slug === "van-hoc" && (
                <div className="px-6 max-w-7xl mx-auto my-4">
                  <img
                    src="/images/banner_home1.webp"
                    alt="Banner Văn học"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              )}

              {/* Banner trước mục 'Tâm lí - Kĩ năng sống' */}
              {section.slug === "tam-li-ki-nang-song" && (
                <div className="px-6 max-w-7xl mx-auto my-4">
                  <img
                    src="/images/banner_home2.webp"
                    alt="Banner Tâm lí - Kĩ năng sống"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              )}

              {/* Banner trước mục 'Manga' */}
              {section.slug === "manga" && (
                <div className="px-6 max-w-7xl mx-auto my-4">
                  <img
                    src="/images/banner_home3.webp"
                    alt="Banner Tâm lí - Kĩ năng sống"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              )}

              <div className="px-6 max-w-7xl mx-auto">
                <BookSection
                  title={section.title}
                  books={section.slug === "sach-moi" ? newBooks : section.books}
                  slug={section.slug}
                />
              </div>
            </React.Fragment>
          ))}
        </div>

        <section className="flex flex-col lg:flex-row items-center gap-8 px-6 py-12 max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="flex-1 text-left">
            <h2 className="text-3xl font-bold text-sky-600">ReadHub</h2>
            <p className="italic text-sky-700 mt-1">
              Thư viện thông minh cho thế hệ mới
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed text-justify">
              ReadHub là thư viện số hiện đại, nơi bạn dễ dàng tiếp cận sách,
              tài liệu và kiến thức mọi lúc, mọi nơi. Với kho tài nguyên phong
              phú và trải nghiệm người dùng tối ưu, ReadHub hướng tới trở thành
              người bạn đồng hành đáng tin cậy trên hành trình chinh phục tri
              thức trong kỷ nguyên số.
            </p>
            <button className="mt-6 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-5 rounded shadow">
              Xem thêm
            </button>
          </div>

          {/* Video */}
          <div className="flex-1">
            <video
              src="/video.mp4"
              className="rounded shadow-lg w-full object-cover"
              autoPlay
              muted
              loop
            />
          </div>
        </section>

        <section className="bg-background pb-2">
          <div className="group relative m-auto max-w-7xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-center text-sm">Nhà xuất bản hàng đầu</p>
              </div>
              <div className="relative py-3 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  <div className="flex">
                    <img
                      className="mx-auto h-8 w-fit dark:invert"
                      src="/nxb/kd.jpg"
                      alt="Oxford Publishing"
                      height="40"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-8 w-fit dark:invert"
                      src="/nxb/pn.jpg"
                      alt="Cambridge Publishing"
                      height="40"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-8  w-fit dark:invert"
                      src="/nxb/tg.png"
                      alt="Penguin Publishing"
                      height="40"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-8 w-fit dark:invert"
                      src="/nxb/nn.jpg"
                      alt="Random House"
                      height="40"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-10 w-fit dark:invert"
                      src="/nxb/xbt.png"
                      alt="Random House"
                      height="40"
                      width="auto"
                    />
                  </div>
                </InfiniteSlider>

                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
