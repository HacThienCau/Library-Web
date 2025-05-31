"use client";
import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import StatisticsCard from "./StatisticsCard";
import BookTable from "./BookTable";
import BookCalendar from "./Calendar";

const Dashboard = () => {
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#F4F7FE]">
      <Sidebar />
      <main className="self-stretch pr-[1.25rem] md:pl-52 ml-[1.25rem] my-auto w-full max-md:max-w-full pb-[2rem]">
        <div className="flex flex-col gap-2.5 self-start pt-5">
          <h1 className="font-semibold text-[#062D67] text-[1.5rem]">
            Dashboard
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 self-stretch shrink gap-4 justify-between items-center w-full leading-none text-white h-full max-md:max-w-full">
            <StatisticsCard
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e444cbee3c99f14768fa6c876faa966d9bede995?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816"
              title="Tổng đầu sách"
              value="3685"
              percentage="60"
            />
            <StatisticsCard
              title="Tổng số lượng sách"
              value="36852"
              percentage="60"
            />
            <StatisticsCard
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/70bb6ff8485146e65b19f58221ee1e5ce86c9519?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816"
              title="Tổng số phiếu mượn"
              value="5"
              percentage="20"
            />
            <StatisticsCard
              title="Tổng số phiếu phạt"
              value="36852"
              percentage="60"
            />
          </div>
        </div>
        <section className="py-8 flex justify-between gap-8 w-full">
          {" "}
          {/* Thay đổi số cột trong grid */}
          {/* Biểu đồ Lợi nhuận */}
          <div className="bg-white flex flex-col flex-1 p-6 rounded-[20px] border border-[#cdd5de] md:col-span-5">
            {" "}
            {/* col-span-5 để chiếm 5 cột */}
            <div className="flex items-center justify-start h-full mb-3 gap-2">
              <div className="flex justify-start rounded-full p-2">
                <img src="/icon/chart.svg" alt="Chart Icon" />
              </div>
              <h3 className="text-[1.125rem] font-semibold mb-4">Biểu đồ</h3>
            </div>
            <div className="w-full h-full">
              {/* <canvas ref={chartRef} style={{ display: "block" }}></canvas> */}
            </div>
          </div>
          {/* Biểu đồ Tỉ lệ chuyển đổi */}
          <div className="bg-white flex flex-col p-4 rounded-[20px] border border-[#cdd5de] w-fit md:col-span-3">
            {/* <div className="bg-white p-4 rounded-lg shadow-md w-fit mt-6 relative"></div> */}
            <div className="flex items-center justify-start h-full mb-3 gap-2">
              <div className="flex bg-gray-200 rounded-full p-2">
                <img src="/icon/calendar.svg" alt="Calendar Icon" />
              </div>
              <h3 className="text-[1.125rem] font-semibold">Lịch cá nhân</h3>
            </div>
            <BookCalendar />
          </div>
        </section>

        <div className="bg-white flex flex-col flex-1 p-6 rounded-[20px] border border-[#cdd5de] md:col-span-5">
          {/* col-span-5 để chiếm 5 cột */}
          <div className="flex items-center justify-start h-full mb-3 gap-2">
            <div className="flex bg-gray-200 rounded-full p-2">
              <img src="/icon/book.svg" alt="Book Icon" />
            </div>
            <h3 className="text-[1.125rem] font-semibold">Danh sách các sách</h3>
          </div>

          <div className="w-full h-full">
            <BookTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
