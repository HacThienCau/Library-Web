"use client";

import React, { useEffect, useState } from "react";
import ChatBotButton from "../components/ChatBotButton";
import BookCard from "../components/BookCard";
import LeftSideBar2 from "../components/LeftSideBar2";
import LeftSideBar from "../components/LeftSideBar";

const groupCategories = (rawData) => {
  const grouped = {};

  rawData.forEach((item) => {
    const parent = item.tenTheLoaiCha;
    if (!grouped[parent]) {
      grouped[parent] = [];
    }
    grouped[parent].push({
      id: item.id,
      name: item.tenTheLoaiCon,
      viTri: item.viTri,
    });
  });

  return Object.entries(grouped).map(([parentName, subcategories]) => ({
    parentName,
    subcategories,
  }));
};

const CategorySidebar = ({ groupedCategories, onSelectSubcategory }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">📚 Danh Mục</h2>
      <ul className="space-y-2">
        {groupedCategories.map((group) => (
          <li key={group.parentName}>
            <h3 className="font-medium text-gray-800 mb-1">
              {group.parentName}
            </h3>
            <ul className="ml-4 space-y-1">
              {group.subcategories.map((sub) => (
                <li key={sub.id}>
                  <button
                    onClick={() => onSelectSubcategory(sub)}
                    className="text-blue-700 hover:underline"
                  >
                    🍒 {sub.name}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BookSortFilters = ({ onSelectSort, selectedSort }) => {
  const sortOptions = [
    { label: "Tất cả", value: "all" },
    { label: "Mới nhất", value: "newest" },
    { label: "Được mượn nhiều", value: "mostBorrowed" },
    { label: "Đánh giá cao", value: "topRated" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
      {sortOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelectSort(opt.value)}
          className={`w-full px-4 py-2 rounded-lg text-center ${
            selectedSort === opt.value
              ? "bg-sky-900 text-white"
              : "bg-zinc-200 text-[#062D76]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

const Page = () => {
  const [groupedCategories, setGroupedCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState("all");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesRes, booksRes] = await Promise.all([
          fetch("http://localhost:8081/books/categories"),
          fetch("http://localhost:8081/books"),
        ]);
        const categoriesData = await categoriesRes.json();
        const grouped = groupCategories(categoriesData);
        setGroupedCategories(grouped);

        const allBooks = await booksRes.json();
        setBooks(allBooks);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const fetchBooks = async (subcategory, sortKey) => {
    try {
      let url = "http://localhost:8081/books";

      if (subcategory) {
        url = `http://localhost:8081/books/categories/id/${subcategory.id}`;
      }

      if (sortKey) {
        // Ví dụ: thêm query param ?sort=borrowed hoặc ?sort=latest
        url += `?sort=${sortKey}`;
      }
      console.log("Fetching books from URL:", url);
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setBooks([]);
    }
  };

  const handleSubcategorySelect = (sub) => {
    setSelectedSubcategory(sub);
    fetchBooks(sub, selectedSort);
  };

  const handleSortChange = (sortKey) => {
    setSelectedSort(sortKey);
    fetchBooks(selectedSubcategory, sortKey);
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <main className="pt-16 flex gap-4 px-4">
        {/* Nếu vẫn giữ CategorySidebar bên ngoài khung trắng, để ngoài hoặc bỏ hẳn */}
        <aside className="w-64 shrink-0">
        
        </aside>

        {/* Khung trắng chung chứa LeftSideBar2 + khu vực chính */}
        <section className="flex-1 bg-white rounded-xl p-5 flex gap-6 max-md:flex-col max-md:p-4 border border-gray-200 shadow-md">
          {/* LeftSideBar2 - chiều rộng cố định */}
          <div className="w-64 shrink-0">
            <LeftSideBar2
              groupedCategories={groupedCategories}
              selectedSubcategory={selectedSubcategory}
              onSelectSubcategory={handleSubcategorySelect}
            />
          </div>

          {/* Khu vực chính */}
          <div className="flex-1">
            {loading ? (
              <div>Đang tải danh mục...</div>
            ) : (
              <>
                {/* Bộ lọc */}
                <BookSortFilters
                  selectedSort={selectedSort}
                  onSelectSort={handleSortChange}
                />

                {/* Tiêu đề danh mục (nếu có) */}
                {/* {selectedSubcategory && (
                  <h2 className="gap-2.5 self-start mt-4 px-[1.25rem] py-[0.625rem] text-[1.25rem] text-white bg-[#062D76] rounded-lg inline-block">
                    {selectedSubcategory.name}
                  </h2>
                )} */}

                {/* Lưới sách */}
                <div className="grid grid-cols-3 gap-6 mt-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
                  {books.map((book, index) => (
                    <div
                      key={book.id || index}
                      className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
                    >
                      <BookCard
                        key={book.id || index}
                        id={book.id}
                        imageSrc={book.hinhAnh[0]}
                        available={
                          book.tongSoLuong -
                            book.soLuongMuon -
                            book.soLuongXoa >
                          0
                        }
                        title={book.tenSach}
                        author={book.tenTacGia}
                        publisher={book.nxb}
                        borrowCount={book.soLuongMuon}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <ChatBotButton />
      </main>
    </div>
  );
};

export default Page;
