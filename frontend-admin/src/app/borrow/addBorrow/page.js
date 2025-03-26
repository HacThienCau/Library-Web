"use client";
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";

const backIcon = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M38 14V26C38 28.206 36.208 30 34 30H6V24H32V16H10V20L2 13L10 6V10H34C35.0609 10 36.0783 10.4214 36.8284 11.1716C37.5786 11.9217 38 12.9391 38 14Z" fill="white"></path> </svg>`;

const dropdownIcon = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11.6667 16.6667L20.0001 25.0001L28.3334 16.6667H11.6667Z" fill="#D66766"></path> </svg>`;

const checkIcon = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_63_4107)"> <path d="M29.1211 11.6211L30.8789 13.3789L16.25 28.0078L9.12109 20.8789L10.8789 19.1211L16.25 24.4922L29.1211 11.6211Z" fill="white"></path> </g> </svg>`;

const calendarIcon = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11.346 0C11.7173 0 12.0734 0.1475 12.3359 0.410051C12.5985 0.672601 12.746 1.0287 12.746 1.4V4.018H27.78V1.418C27.78 1.0467 27.9275 0.690601 28.1901 0.428051C28.4526 0.1655 28.8087 0.018 29.18 0.018C29.5513 0.018 29.9074 0.1655 30.1699 0.428051C30.4325 0.690601 30.58 1.0467 30.58 1.418V4.018H36C37.0605 4.018 38.0776 4.43915 38.8277 5.18887C39.5778 5.93858 39.9995 6.95548 40 8.016V36.002C39.9995 37.0625 39.5778 38.0794 38.8277 38.8291C38.0776 39.5788 37.0605 40 36 40H4C2.93948 40 1.92237 39.5788 1.17228 38.8291C0.422192 38.0794 0.00053026 37.0625 0 36.002L0 8.016C0.00053026 6.95548 0.422192 5.93858 1.17228 5.18887C1.92237 4.43915 2.93948 4.018 4 4.018H9.946V1.398C9.94653 1.02704 10.0943 0.671462 10.3568 0.409343C10.6193 0.147225 10.975 -3.78527e-07 11.346 0Z" fill="white"></path></svg>`;

const IconButton = ({ icon, onClick, className = "", variant = "primary" }) => {
  const baseClasses =
    "flex justify-center items-center p-2.5 rounded-xl h-[60px] w-[60px]";
  const variantClasses = variant === "primary" ? "bg-red-400" : "bg-white";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      type="button"
    >
      <div dangerouslySetInnerHTML={{ __html: icon }} />
    </button>
  );
};

const DatePickerField = ({ label, value, onChange }) => {
  return (
    <div className="flex-1">
      <h3 className="mb-5 text-2xl font-bold text-black">{label}</h3>
      <div className="flex gap-5">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="flex-1 p-3 text-2xl text-black bg-white rounded-xl shadow-sm"
        />
        <IconButton icon={calendarIcon} onClick={() => {}} />
      </div>
    </div>
  );
};

const UserInfoSection = () => {
  return (
    <section className="flex gap-8 mt-5 max-md:flex-col">
      <div className="flex-1">
        <h3 className="mb-5 text-2xl font-bold text-black">ID Người Dùng</h3>
        <div className="flex justify-between items-center p-3 w-full bg-white rounded-xl shadow-sm">
          <span className="text-2xl text-black">33</span>
          <div dangerouslySetInnerHTML={{ __html: dropdownIcon }} />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="mb-5 text-2xl font-bold text-black">Tên Người Dùng</h3>
        <div className="p-3 w-full text-2xl rounded-xl shadow-sm bg-stone-300 text-neutral-500">
          Nguyễn Lê Thanh Huyền
        </div>
      </div>
    </section>
  );
};

const BookListItem = ({ book, border = true }) => {
  return (
    <article
      className={`flex ${border ? "pb-8 border border-stone-300" : ""} max-md:flex-col max-md:gap-5`}
    >
      <img src={book.image} alt={book.title} className="w-[100px] h-[141px]" />
      <div className="flex-1 ml-8">
        <h3 className="text-3xl font-bold text-black">{book.title}</h3>
        <p className="mt-3.5 text-2xl text-black">{book.author}</p>
        <p className="mt-5 text-3xl font-bold text-black">ID Sách: {book.id}</p>
      </div>
      <div className="flex gap-5 items-center">
        <span className="text-3xl font-bold text-center text-black">
          Số Lượng:
        </span>
        <div className="text-3xl font-bold text-center text-black bg-white rounded-xl border border-black h-[50px] w-[50px]">
          {book.quantity}
        </div>
      </div>
    </article>
  );
};

const SelectedBooks = () => {
  const sampleBooks = [
    {
      id: 149,
      title: "Vợ Nhặt (Tái Bản 2022)",
      author: "Kim Lân",
      quantity: 1,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/56c8d0912aa68a85a5cd1fbf099a39793007c362",
    },
    {
      id: 13,
      title: "Chinh Phục Luyện Thi Vào 10 Môn Tiếng Anh Theo Chủ Đề",
      author: "Dương Dương",
      quantity: 1,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cb256e1f4cf0311f5583ba6d366bdc0742474b8a",
    },
  ];

  return (
    <section className="p-8 mt-10 bg-white rounded-3xl shadow-sm">
      {sampleBooks.map((book, index) => (
        <div key={book.id} className={index === 0 ? "" : "pt-8"}>
          <BookListItem book={book} border={index === 0} />
        </div>
      ))}
    </section>
  );
};

function page() {
  return (
    <main className="flex w-full bg-pink-50 min-h-[screen]">
      <Sidebar />

      <div className="flex-1 p-8 ml-[250px] max-md:ml-[300px] max-sm:ml-0 max-md:p-5 max-sm:p-4 mr-[50px]">
        <IconButton icon={backIcon} onClick={() => {}} />

        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-bold text-black">ID (Tự Động)</h2>
          <div className="p-3 w-full text-2xl rounded-xl shadow-sm bg-zinc-300 text-neutral-500">
            18
          </div>
        </section>

        <UserInfoSection />

        <div className="flex gap-8 mt-5 max-md:flex-col">
          <DatePickerField
            label="Ngày Mượn"
            value="09/03/2025"
            onChange={() => {}}
          />
          <DatePickerField
            label="Ngày Trả Dự Kiến"
            value="16/03/2025"
            onChange={() => {}}
          />
        </div>

        <section className="mt-10">
          <h2 className="mb-5 text-3xl font-bold text-black">
            Danh Sách Sách Mượn
          </h2>
          <div className="flex gap-8 max-md:flex-col">
            <div className="flex-1">
              <h3 className="mb-5 text-2xl font-bold text-black">ID Sách</h3>
              <div className="flex justify-between items-center p-3 w-full bg-white rounded-xl shadow-sm">
                <span className="text-2xl text-black">13</span>
                <div dangerouslySetInnerHTML={{ __html: dropdownIcon }} />
              </div>
            </div>
            <div className="flex-[2]">
              <h3 className="mb-5 text-2xl font-bold text-black">Tên Sách</h3>
              <div className="p-3 w-full text-2xl rounded-xl shadow-sm bg-zinc-300 text-neutral-500">
                Chinh Phục Luyện Thi Vào 10 Môn Tiếng Anh Theo...
              </div>
            </div>
            <div className="flex-1">
              <h3 className="mb-5 text-2xl font-bold text-black">Số Lượng</h3>
              <input
                type="text"
                value="1"
                className="p-3 w-full text-2xl text-black bg-white rounded-xl shadow-sm"
              />
            </div>
            <IconButton icon={checkIcon} onClick={() => {}} />
          </div>
        </section>

        <SelectedBooks />

        <footer className="flex justify-end items-center p-2.5 mt-10 w-full bg-white rounded-xl shadow-sm h-[100px]">
          <button className="flex gap-5 justify-center items-center px-24 py-5 h-20 bg-red-400 rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: checkIcon }} />
            <span className="text-3xl font-bold text-center text-white">
              Hoàn Tất
            </span>
          </button>
        </footer>
      </div>
    </main>
  );
}

export default page;
