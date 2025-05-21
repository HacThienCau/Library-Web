// import React from 'react';
// import ChatBotButton from '../components/ChatBotButton';
// import BookCard from "../components/BookCard";
// import LeftSideBar from "../components/LeftSideBar";

// const CategoryFilters =() =>{
//   return (
//     <section className="flex flex-col p-[1.25rem] w-full text-[1.25rem] bg-white rounded-xl max-md:max-w-full">
//       <div className="flex gap-6 items-start self-start">
//         <button className="gap-2.5 self-stretch px-[1.25rem] py-[0.625rem] text-white bg-sky-900 rounded-lg">
//           Sách tiếng việt
//         </button>
//         <button className="gap-2.5 self-stretch px-[1.25rem] py-[0.625rem] text-[#062D76] rounded-lg bg-zinc-200">
//           Sách ngoại ngữ
//         </button>
//       </div>
//       <div className="flex flex-wrap gap-2.5 justify-center content-start items-start py-5 mt-3 w-full text-[#062D76] bg-white border-t border-solid border-t-[color:var(--foundation-blue-light-active,#B2BED5)] max-md:max-w-full">
//         <button className="gap-2.5 self-stretch px-[1.25rem] py-[0.625rem] text-white bg-sky-900 rounded-lg">
//           Văn học
//         </button>
//         {Array(11)
//           .fill(null)
//           .map((_, index) => (
//             <button
//               key={index}
//               className="gap-2.5 self-stretch px-[1.25rem] py-[0.625rem] rounded-lg bg-slate-200"
//             >
//               Thể loại
//             </button>
//           ))}
//       </div>
//     </section>
//   );
// }

// const books = [
//   {
//     imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b777cb3ef9abb920d086e97e27ac4f6f3559695",
//     available:true,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/fc01b7cf44e0ca2f23258dcc0ad69329b2612af0?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: false,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/5e8a0f3fd4681a9512313c2c1c6dae1285bcf0a6?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: true,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d854294877ea4263cf3494a98eecfd64cd148327?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: false,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/acf848c9260bfc86d1f9094e17e14ec25f3ec193?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: true,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
//   {
//     imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d854294877ea4263cf3494a98eecfd64cd148327?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816",
//     available: false,
//     title: "Nam cao",
//     author: "Văn học",
//     publisher: "Văn học Việt Nam (2019)",
//     borrowCount: 120,
//   },
// ];

// const page = () => {
//   return (
//     <div className="flex flex-col min-h-screen text-foreground">
//         <main className="pt-16 flex">
//         <LeftSideBar />
//         <section className="self-stretch pr-[1.25rem] md:pl-60 ml-[1.25rem] my-auto w-full max-md:max-w-full mt-2 mb-2">
//           <CategoryFilters />
//           <div className="flex flex-col p-5 mt-3 w-full bg-white rounded-xl max-md:max-w-full">
//             <h2 className="gap-2.5 self-start px-[1.25rem] py-[0.625rem] text-[1.25rem] text-white bg-[#062D76] rounded-lg">
//               Văn học
//             </h2>
//           <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 items-start mt-5 w-full max-md:max-w-full">
//               {books.map((book, index) => (
//                 <BookCard
//                   key={index}
//                   imageSrc={book.imageSrc}
//                   available={book.available}
//                   title={book.title}
//                   author={book.author}
//                   publisher={book.publisher}
//                   borrowCount={book.borrowCount}
//                 />
//               ))}
//             </div>
//             </div>
//         </section>
//         <ChatBotButton />
//         </main>
//     </div>
//   )
// }

// export default page

'use client';

import React, { useEffect, useState } from 'react';
import ChatBotButton from '../components/ChatBotButton';
import BookCard from '../components/BookCard';
import LeftSideBar from '../components/LeftSideBar';

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

const CategoryFilters = ({ groupedCategories, onSelectSubcategory }) => {
  const [activeMainIndex, setActiveMainIndex] = useState(0);

  return (
    <section className="flex flex-col p-5 w-full text-lg bg-white rounded-xl">
      <div className="flex gap-4 items-start flex-wrap">
        {groupedCategories.map((group, idx) => (
          <button
            key={group.parentName}
            onClick={() => setActiveMainIndex(idx)}
            className={`px-5 py-2 rounded-lg ${
              idx === activeMainIndex ? 'bg-sky-900 text-white' : 'bg-zinc-200 text-[#062D76]'
            }`}
          >
            {group.parentName}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-4 border-t pt-4 border-blue-200">
        {groupedCategories[activeMainIndex]?.subcategories?.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onSelectSubcategory(sub)}
            className="px-5 py-2 rounded-lg bg-slate-200 text-[#062D76]"
          >
            {sub.name}
          </button>
        ))}
      </div>
    </section>
  );
};

const Page = () => {
  const [groupedCategories, setGroupedCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8081/books/categories"); // 🔁 API thật từ BE
        const data = await res.json();
        const grouped = groupCategories(data);
        setGroupedCategories(grouped);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubcategorySelect = async (sub) => {
    setSelectedSubcategory(sub);
    console.log('Selected subcategory:', sub);
    // 🔁 Gọi API lấy sách theo sub.id (hoặc viTri nếu cần)
    try {
      const res = await fetch(`http://localhost:8081/books/categories/id/${sub.id}`);
      const data = await res.json();
      console.log('Fetched books:', data);
      setBooks(data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
      setBooks([]); // fallback nếu lỗi
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <main className="pt-16 flex">
        <LeftSideBar />
        <section className="self-stretch pr-5 md:pl-60 ml-5 w-full mt-2 mb-2">
          {loading ? (
            <div className="p-5 bg-white rounded-xl">Đang tải danh mục...</div>
          ) : (
            <>
              <CategoryFilters
                groupedCategories={groupedCategories}
                onSelectSubcategory={handleSubcategorySelect}
              />

              {selectedSubcategory && (
                <div className="flex flex-col p-5 mt-4 w-full bg-white rounded-xl">
                  <h2 className="px-5 py-2 text-lg text-white bg-[#062D76] rounded-lg self-start">
                    {selectedSubcategory.name}
                  </h2>

                  <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 mt-5 w-full">
                    {books?.map((book, index) => (
                      <BookCard
                        key={book.id || index}
                        imageSrc={book.hinhAnh[0]}
                        available={book.tongSoLuong - book.soLuongMuon - book.soLuongXoa > 0}
                        title={book.tenSach}
                        author={book.tenTacGia}
                        publisher={book.nxb}
                        borrowCount={book.soLuongMuon}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
        <ChatBotButton />
      </main>
    </div>
  );
};

export default Page;