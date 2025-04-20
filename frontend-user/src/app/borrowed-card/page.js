"use client";
import React, { useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import ChatBotButton from "../components/ChatBotButton";
import { useRouter } from "next/navigation";

const page = () => {
  const initData = {
    borrowed: [
      {
        id: 13,
        userId: 21,
        borrowDate: "09/03/2025",
        returnDate: "23/03/2025",
      },
      {
        id: 14,
        userId: 18,
        borrowDate: "09/03/2025",
        returnDate: "16/03/2025",
      },
      {
        id: 15,
        userId: 21,
        borrowDate: "09/03/2025",
        returnDate: "23/03/2025",
      },
      {
        id: 16,
        userId: 22,
        borrowDate: "10/03/2025",
        returnDate: "24/03/2025",
      },
    ],
    returned: [
      {
        id: 12,
        userId: 71,
        borrowDate: "10/03/2025",
        returnedDate: "17/03/2025",
      },
      {
        id: 11,
        userId: 18,
        borrowDate: "09/03/2025",
        returnedDate: "16/03/2025",
      },
      {
        id: 10,
        userId: 21,
        borrowDate: "09/03/2025",
        returnedDate: "23/03/2025",
      },
      {
        id: 19,
        userId: 23,
        borrowDate: "11/03/2025",
        returnedDate: "20/03/2025",
      },
    ],
    requested: [
      { id: 20, userId: 25, requestDate: "12/03/2025" },
      { id: 21, userId: 26, requestDate: "12/03/2025" },
      { id: 22, userId: 27, requestDate: "13/03/2025" },
      { id: 23, userId: 28, requestDate: "14/03/2025" },
    ],
  };

  const [selectedButton, setSelectedButton] = useState("requested");
  const [borrowings, setBorrowings] = useState(initData.borrowed);
  const [returned, setReturned] = useState(initData.returned);
  const [requested, setRequested] = useState(initData.requested);

  //   const fetchBorrowedData = async () => {
  //   try {
  //     const response = await fetch("/api/borrowed"); // API dữ liệu đã mượn
  //     const data = await response.json();
  //     setBorrowings(data);
  //   } catch (error) {
  //     console.error("Lỗi khi lấy dữ liệu đã mượn:", error);
  //   }
  // };

  const fetchBorrowedData = () => {
    setBorrowings(initData.borrowed);
  };

  //   const fetchReturnedData = async () => {
  //   try {
  //     const response = await fetch("/api/returned"); // API dữ liệu đã mượn
  //     const data = await response.json();
  //     setReturned(data);
  //   } catch (error) {
  //     console.error("Lỗi khi lấy dữ liệu đã mượn:", error);
  //   }
  // };

  const fetchReturnedData = () => {
    setReturned(initData.returned);
  };

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
    if (buttonType === "borrowed") {
      setBorrowings(initData.borrowed);
    } else if (buttonType === "returned") {
      setReturned(initData.returned);
    } else if (buttonType === "requested") {
      setRequested(initData.requested);
    }
  };

  const route = useRouter();
  const handleDetails = (id) => {
    route.push(`/borrowed-card/${id}`);
  };

  return (
    <main className="flex flex-col min-h-screen text-foreground">
      <div className="pt-16 flex">
        <LeftSideBar />
        <section className="self-stretch pr-[1.25rem] md:pl-60 ml-[1.25rem] my-auto w-full max-md:max-w-full mt-2">
        <div className="mx-auto">
          <header className="flex gap-10 max-md:flex-col max-md:gap-4 ">
            {/* Current Borrowings Status */}
            <section
              className={`flex flex-1 gap-5 justify-center items-center rounded-3xl h-[50px] cursor-pointer ${
                selectedButton === "requested" ? "bg-[#062D76]" : "bg-gray-300"
              }`}
              onClick={() => handleButtonClick("requested")}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 19.995C14.6667 18.3716 15.9817 17.0566 17.6 17.0566C19.22 17.0566 20.5333 18.3733 20.5333 19.995C20.5333 21.6183 19.22 22.935 17.6 22.935C15.9817 22.935 14.6667 21.6183 14.6667 19.995ZM36.3833 15.1683L34.355 19.2566L33.0417 15.3916H33.04C32.9244 15.054 32.7165 14.7555 32.4397 14.5303C32.163 14.305 31.8285 14.1619 31.4745 14.1172C31.1204 14.0726 30.7609 14.1283 30.4369 14.2778C30.1129 14.4274 29.8374 14.6649 29.6417 14.9633C28.765 16.3 27.8917 17.6466 27.0183 18.9866L26.555 15.7266C26.5253 15.4723 26.4447 15.2266 26.3181 15.0041C26.1915 14.7816 26.0214 14.5868 25.8179 14.4314C25.6144 14.276 25.3818 14.1631 25.1338 14.0995C24.8858 14.0359 24.6275 14.0228 24.3744 14.0611C24.1212 14.0993 23.8784 14.1881 23.6602 14.3222C23.4421 14.4563 23.2532 14.6329 23.1048 14.8414C22.9563 15.05 22.8514 15.2864 22.7961 15.5364C22.7409 15.7864 22.7365 16.0449 22.7833 16.2966L22.865 16.8433C22.3198 15.9275 21.545 15.1698 20.6172 14.6451C19.6894 14.1204 18.6408 13.8469 17.575 13.8516C16.5092 13.8563 15.463 14.1391 14.5399 14.672C13.6168 15.2048 12.8488 15.9693 12.3117 16.89L12.4283 16.3183C12.4789 16.0799 12.4819 15.8339 12.437 15.5944C12.3921 15.3549 12.3002 15.1266 12.1667 14.9228C12.0332 14.719 11.8607 14.5436 11.659 14.4067C11.4574 14.2699 11.2307 14.1743 10.992 14.1254C10.7532 14.0766 10.5072 14.0755 10.268 14.1222C10.0289 14.1689 9.8013 14.2625 9.59847 14.3976C9.39564 14.5326 9.22155 14.7065 9.08622 14.9091C8.9509 15.1118 8.85701 15.3392 8.80999 15.5783L8.01666 19.475L5.09666 14.945C4.89839 14.6378 4.61324 14.3964 4.27746 14.2517C3.94169 14.107 3.57046 14.0654 3.21098 14.1322C2.8515 14.199 2.52002 14.3713 2.25868 14.627C1.99734 14.8827 1.81795 15.2104 1.74332 15.5683L0.038324 23.9216C-0.0176547 24.1908 -0.0129319 24.4691 0.0521489 24.7362C0.11723 25.0033 0.241032 25.2526 0.414551 25.4659C0.58807 25.6791 0.806942 25.851 1.05525 25.9691C1.30355 26.0871 1.57505 26.1484 1.84999 26.1483C2.70499 26.155 3.47666 25.5516 3.65666 24.6616L4.44999 20.765C5.43666 22.3016 6.42555 23.8372 7.41666 25.3716C7.62855 25.6678 7.92329 25.8948 8.26382 26.0239C8.60436 26.1531 8.97547 26.1786 9.33049 26.0974C9.68551 26.0162 10.0086 25.8318 10.2591 25.5674C10.5096 25.303 10.6763 24.9705 10.7383 24.6116L11.52 20.775C11.707 22.2559 12.4277 23.6179 13.5469 24.6055C14.6662 25.5932 16.1073 26.1387 17.6 26.14C18.9699 26.139 20.3001 25.6795 21.3784 24.8346C22.4568 23.9898 23.2213 22.8082 23.55 21.4783L23.9867 24.41C24.11 25.375 24.9 26.1383 25.8883 26.1383C26.6 26.1383 27.1817 25.73 27.55 25.165L30.6917 20.34L32.2 24.7816C32.47 25.5733 33.1667 26.1383 34.0267 26.1383C34.825 26.1383 35.4517 25.6583 35.7933 24.945L39.7983 16.87C40.0244 16.4163 40.0616 15.8915 39.9016 15.4104C39.7417 14.9294 39.3977 14.5313 38.945 14.3033C38.72 14.1908 38.4749 14.1239 38.2239 14.1066C37.973 14.0893 37.721 14.1219 37.4827 14.2024C37.2444 14.283 37.0244 14.41 36.8354 14.5761C36.6464 14.7421 36.4922 14.944 36.3817 15.17" fill="white"/></svg>',
                }}
              />
              <h2 className="text-[1.125rem] font-medium text-white">Đang xử lý</h2>
            </section>

            <section
              className={`flex flex-1 gap-5 justify-center items-center rounded-3xl h-[50px] cursor-pointer ${
                selectedButton === "borrowed" ? "bg-[#062D76]" : "bg-gray-300"
              }`}
              onClick={() => handleButtonClick("borrowed")}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 19.995C14.6667 18.3716 15.9817 17.0566 17.6 17.0566C19.22 17.0566 20.5333 18.3733 20.5333 19.995C20.5333 21.6183 19.22 22.935 17.6 22.935C15.9817 22.935 14.6667 21.6183 14.6667 19.995ZM36.3833 15.1683L34.355 19.2566L33.0417 15.3916H33.04C32.9244 15.054 32.7165 14.7555 32.4397 14.5303C32.163 14.305 31.8285 14.1619 31.4745 14.1172C31.1204 14.0726 30.7609 14.1283 30.4369 14.2778C30.1129 14.4274 29.8374 14.6649 29.6417 14.9633C28.765 16.3 27.8917 17.6466 27.0183 18.9866L26.555 15.7266C26.5253 15.4723 26.4447 15.2266 26.3181 15.0041C26.1915 14.7816 26.0214 14.5868 25.8179 14.4314C25.6144 14.276 25.3818 14.1631 25.1338 14.0995C24.8858 14.0359 24.6275 14.0228 24.3744 14.0611C24.1212 14.0993 23.8784 14.1881 23.6602 14.3222C23.4421 14.4563 23.2532 14.6329 23.1048 14.8414C22.9563 15.05 22.8514 15.2864 22.7961 15.5364C22.7409 15.7864 22.7365 16.0449 22.7833 16.2966L22.865 16.8433C22.3198 15.9275 21.545 15.1698 20.6172 14.6451C19.6894 14.1204 18.6408 13.8469 17.575 13.8516C16.5092 13.8563 15.463 14.1391 14.5399 14.672C13.6168 15.2048 12.8488 15.9693 12.3117 16.89L12.4283 16.3183C12.4789 16.0799 12.4819 15.8339 12.437 15.5944C12.3921 15.3549 12.3002 15.1266 12.1667 14.9228C12.0332 14.719 11.8607 14.5436 11.659 14.4067C11.4574 14.2699 11.2307 14.1743 10.992 14.1254C10.7532 14.0766 10.5072 14.0755 10.268 14.1222C10.0289 14.1689 9.8013 14.2625 9.59847 14.3976C9.39564 14.5326 9.22155 14.7065 9.08622 14.9091C8.9509 15.1118 8.85701 15.3392 8.80999 15.5783L8.01666 19.475L5.09666 14.945C4.89839 14.6378 4.61324 14.3964 4.27746 14.2517C3.94169 14.107 3.57046 14.0654 3.21098 14.1322C2.8515 14.199 2.52002 14.3713 2.25868 14.627C1.99734 14.8827 1.81795 15.2104 1.74332 15.5683L0.038324 23.9216C-0.0176547 24.1908 -0.0129319 24.4691 0.0521489 24.7362C0.11723 25.0033 0.241032 25.2526 0.414551 25.4659C0.58807 25.6791 0.806942 25.851 1.05525 25.9691C1.30355 26.0871 1.57505 26.1484 1.84999 26.1483C2.70499 26.155 3.47666 25.5516 3.65666 24.6616L4.44999 20.765C5.43666 22.3016 6.42555 23.8372 7.41666 25.3716C7.62855 25.6678 7.92329 25.8948 8.26382 26.0239C8.60436 26.1531 8.97547 26.1786 9.33049 26.0974C9.68551 26.0162 10.0086 25.8318 10.2591 25.5674C10.5096 25.303 10.6763 24.9705 10.7383 24.6116L11.52 20.775C11.707 22.2559 12.4277 23.6179 13.5469 24.6055C14.6662 25.5932 16.1073 26.1387 17.6 26.14C18.9699 26.139 20.3001 25.6795 21.3784 24.8346C22.4568 23.9898 23.2213 22.8082 23.55 21.4783L23.9867 24.41C24.11 25.375 24.9 26.1383 25.8883 26.1383C26.6 26.1383 27.1817 25.73 27.55 25.165L30.6917 20.34L32.2 24.7816C32.47 25.5733 33.1667 26.1383 34.0267 26.1383C34.825 26.1383 35.4517 25.6583 35.7933 24.945L39.7983 16.87C40.0244 16.4163 40.0616 15.8915 39.9016 15.4104C39.7417 14.9294 39.3977 14.5313 38.945 14.3033C38.72 14.1908 38.4749 14.1239 38.2239 14.1066C37.973 14.0893 37.721 14.1219 37.4827 14.2024C37.2444 14.283 37.0244 14.41 36.8354 14.5761C36.6464 14.7421 36.4922 14.944 36.3817 15.17" fill="white"/></svg>',
                }}
              />
              <h2 className="text-[1.125rem] font-medium text-white">Còn hạn</h2>
            </section>

            {/* Returned Status */}
            <section
              className={`flex flex-1 gap-5 justify-center items-center rounded-3xl h-[50px] cursor-pointer ${
                selectedButton === "returned" ? "bg-[#062D76]" : "bg-gray-300"
              }`}
              onClick={() => handleButtonClick("returned")}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 35C16.5 35 13.4028 33.9378 10.7083 31.8133C8.01389 29.6889 6.26389 26.9733 5.45833 23.6667C5.34722 23.25 5.43056 22.8683 5.70833 22.5217C5.98611 22.175 6.36111 21.9733 6.83333 21.9167C7.27778 21.8611 7.68056 21.9444 8.04167 22.1667C8.40278 22.3889 8.65278 22.7222 8.79167 23.1667C9.45833 25.6667 10.8333 27.7083 12.9167 29.2917C15 30.875 17.3611 31.6667 20 31.6667C23.25 31.6667 26.0072 30.535 28.2717 28.2717C30.5361 26.0083 31.6678 23.2511 31.6667 20C31.6656 16.7489 30.5339 13.9922 28.2717 11.73C26.0094 9.46778 23.2522 8.33556 20 8.33333C18.0833 8.33333 16.2917 8.77778 14.625 9.66667C12.9583 10.5556 11.5556 11.7778 10.4167 13.3333H13.3333C13.8056 13.3333 14.2017 13.4933 14.5217 13.8133C14.8417 14.1333 15.0011 14.5289 15 15C14.9989 15.4711 14.8389 15.8672 14.52 16.1883C14.2011 16.5094 13.8056 16.6689 13.3333 16.6667H6.66667C6.19444 16.6667 5.79889 16.5067 5.48 16.1867C5.16111 15.8667 5.00111 15.4711 5 15V8.33333C5 7.86111 5.16 7.46556 5.48 7.14667C5.8 6.82778 6.19556 6.66778 6.66667 6.66667C7.13778 6.66556 7.53389 6.82556 7.855 7.14667C8.17611 7.46778 8.33556 7.86333 8.33333 8.33333V10.5833C9.75 8.80556 11.4794 7.43056 13.5217 6.45833C15.5639 5.48611 17.7233 5 20 5C22.0833 5 24.035 5.39611 25.855 6.18833C27.675 6.98056 29.2583 8.04944 30.605 9.395C31.9517 10.7406 33.0211 12.3239 33.8133 14.145C34.6056 15.9661 35.0011 17.9178 35 20C34.9989 22.0822 34.6033 24.0339 33.8133 25.855C33.0233 27.6761 31.9539 29.2594 30.605 30.605C29.2561 31.9506 27.6728 33.02 25.855 33.8133C24.0372 34.6067 22.0856 35.0022 20 35ZM21.6667 19.3333L25.8333 23.5C26.1389 23.8056 26.2917 24.1944 26.2917 24.6667C26.2917 25.1389 26.1389 25.5278 25.8333 25.8333C25.5278 26.1389 25.1389 26.2917 24.6667 26.2917C24.1944 26.2917 23.8056 26.1389 23.5 25.8333L18.8333 21.1667C18.6667 21 18.5417 20.8128 18.4583 20.605C18.375 20.3972 18.3333 20.1817 18.3333 19.9583V13.3333C18.3333 12.8611 18.4933 12.4656 18.8133 12.1467C19.1333 11.8278 19.5289 11.6678 20 11.6667C20.4711 11.6656 20.8672 11.8256 21.1883 12.1467C21.5094 12.4678 21.6689 12.8633 21.6667 13.3333V19.3333Z" fill="white"/></svg>',
                }}
              />
              <h2 className="text-[1.125rem] font-medium text-white">Hết hạn</h2>
            </section>
          </header>

          {/* Search Section */}
          <div className="flex flex-wrap gap-3 items-center px-3 py-2.5 mt-3 w-full text-[1.125rem] leading-none text-[#062D76] bg-white backdrop-blur-[100px] min-h-[50px] rounded-[100px] max-md:max-w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/669888cc237b300e928dbfd847b76e4236ef4b5a?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816"
              alt="Search icon"
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[30px] cursor-pointer"
            />
            <input
              type="search"
              id="search-input"
              placeholder="Tìm kiếm"
              className="flex-1 md:text-[1.125rem] bg-transparent border-none outline-none placeholder-[#062D76] text-[#062D76] focus:ring-2 focus:ring-red-dark focus:ring-opacity-50"
            />
          </div>

          {/* Borrowing Cards Section */}
          <section className="gap-y-2.5 mt-8">
            {(selectedButton === "borrowed"
              ? borrowings
              : selectedButton === "returned"
              ? returned
              : requested
            ).map((borrowing) => (
              <article
                key={borrowing.id}
                className="p-8 bg-white rounded-xl shadow-sm mb-5"
              >
                <div className="flex justify-between items-center max-md:flex-col max-md:gap-5 max-md:items-start">
                  <div className="gap-y-5">
                    <h3 className="text-[1.125rem] font-medium">ID: {borrowing.id}</h3>
                    <p className="text-[1.125rem] font-medium">
                      User ID: {borrowing.userId}
                    </p>
                    {selectedButton !== "requested" && (
                      <p className="text-[1.125rem] font-medium">
                        Ngày mượn: {borrowing.borrowDate}
                      </p>
                    )}
                    <p className="text-[1.125rem] font-medium">
                      {selectedButton === "borrowed"
                        ? `Ngày trả dự kiến: ${borrowing.returnDate}`
                        : selectedButton === "returned"
                        ? `Ngày trả: ${borrowing.returnedDate}`
                        : `Ngày yêu cầu: ${borrowing.requestDate}`}
                    </p>
                  </div>
                  <button
                    className="flex gap-5 justify-center items-center px-5 bg-[#062D76] rounded-3xl h-[50px] max-md:w-full"
                    aria-label={`View details for borrowing ${borrowing.id}`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.3334 5H6.66671C4.82837 5 3.33337 6.495 3.33337 8.33333V31.6667C3.33337 33.505 4.82837 35 6.66671 35H33.3334C35.1717 35 36.6667 33.505 36.6667 31.6667V8.33333C36.6667 6.495 35.1717 5 33.3334 5ZM6.66671 31.6667V8.33333H33.3334L33.3367 31.6667H6.66671Z" fill="white"/><path d="M10 11.6667H30V15.0001H10V11.6667ZM10 18.3334H30V21.6667H10V18.3334ZM10 25.0001H20V28.3334H10V25.0001Z" fill="white"/></svg>',
                      }}
                    />
                    <span
                      className="text-[1.125rem] font-medium text-white w-[fit] cursor-pointer"
                      onClick={() => {
                        handleDetails(borrowing.id);
                      }}
                    >
                      Xem chi tiết
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>
      <ChatBotButton />
    </div>
    </main>
  );
};

export default page;
