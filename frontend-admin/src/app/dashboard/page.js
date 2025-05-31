"use client";
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import StatisticsCard from "./StatisticsCard";
import BookTable from "./BookTable";
import BookCalendar from "./Calendar";
import Ranking from "./Ranking";
import { Chart as ChartJS } from "chart.js/auto";

const BookImportChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!data || !chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Tạo chart mới
    chartInstanceRef.current = new ChartJS(ctx, {
      type: "line",
      data: {
        labels: data.monthLabels,
        datasets: [
          {
            label: "Sách",
            data: data.importCounts,
            borderColor: "#FF6384", // Màu đường biểu đồ
            backgroundColor: "rgba(255, 99, 132, 0.2)", // Màu nền
            fill: true, // Điền vùng bên dưới đường
            borderWidth: 2, // Độ dày đường
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Số sách được nhập theo từng tháng",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Số lượng",
            },
          },
          x: {
            title: {
              display: true,
              text: "Tháng",
            },
          },
        },
      },
    });
  }, [data]);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-start h-full mb-3 gap-2">
        <div className="flex bg-gray-200 rounded-full p-2">
          <img src="/icon/chart.svg" alt="Chart Icon" />
        </div>
        <h3 className="text-[1.125rem] font-semibold">Biểu đồ sách nhập về</h3>
      </div>
      <div className="w-full h-[20rem]">
        <canvas ref={chartRef} style={{ display: "block" }}></canvas>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [stats, setStats] = useState(null);
  const [growthStats, setGrowthStats] = useState({
    books: { percentage: 0, status: "up" },
    users: { percentage: 0, status: "up" },
    borrows: { percentage: 0, status: "up" },
    fines: { percentage: 0, status: "up" },
  });
  useEffect(() => {
    fetch("http://localhost:8081/dashboard/books-import")
      .then((res) => res.json())
      .then((data) => {
        const monthLabels = data.map((item) => item._id);
        const importCounts = data.map((item) => item.count);
        setChartData({ monthLabels, importCounts });
      });

    fetch("http://localhost:8081/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);

        const bookInfo = getGrowthInfo(
          data.thisMonthBooks,
          data.lastMonthBooks
        );
        const userInfo = getGrowthInfo(
          data.thisMonthUsers,
          data.lastMonthUsers
        );
        const borrowInfo = getGrowthInfo(
          data.thisMonthBorrowCards,
          data.lastMonthBorrowCards
        );
        const fineInfo = getGrowthInfo(
          data.thisMonthFineCards,
          data.lastMonthFineCards
        );

        setGrowthStats({
          books: bookInfo,
          users: userInfo,
          borrows: borrowInfo,
          fines: fineInfo,
        });
      })
      .catch((err) => console.error("Lỗi khi lấy thống kê:", err));
  }, []);

  function calcGrowth(thisMonth, lastMonth) {
    if (!lastMonth || lastMonth === 0) {
      return thisMonth > 0 ? 100 : 0; // Nếu tháng trước là 0, tháng này có thì coi như tăng 100%
    }
    return (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(1);
  }

  function getGrowthInfo(thisMonth, lastMonth) {
    const percentage = calcGrowth(thisMonth, lastMonth);
    const status = thisMonth >= lastMonth ? "up" : "down"; // Không đổi
    return { percentage, status };
  }
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#F4F7FE]">
      <Sidebar />
      <main className="self-stretch pr-[1.25rem] md:pl-52 ml-[1.25rem] my-auto w-full max-md:max-w-full pb-[2rem]">
        <div className="flex flex-col gap-2.5 self-start pt-5">
          <h1 className="font-semibold text-[#1A2656] text-[1.5rem]">
            Dashboard
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 self-stretch shrink gap-4 justify-between items-center w-full leading-none text-white h-full max-md:max-w-full">
            <StatisticsCard
              title="Tổng đầu sách"
              value={stats?.totalBooks ?? "..."}
              percentage={growthStats.books.percentage}
              status={growthStats.books.status}
              bgColor="bg-[#FDF5E0]"
            />

            <StatisticsCard
              title="Tổng số người dùng"
              value={stats?.totalUsers ?? "..."}
              percentage={growthStats.users.percentage}
              status={growthStats.users.status}
              bgColor="bg-[#E5ECFF]"
            />

            <StatisticsCard
              title="Tổng số phiếu mượn"
              value={stats?.totalBorrowCards ?? "..."}
              percentage={growthStats.borrows.percentage}
              status={growthStats.borrows.status}
              bgColor="bg-[#D8F0EF]"
            />

            <StatisticsCard
              title="Tổng số phiếu phạt"
              value={stats?.totalFineCards ?? "..."}
              percentage={growthStats.fines.percentage}
              status={growthStats.fines.status}
              bgColor="bg-[#FAE9E1]"
            />
          </div>
        </div>
        <section className="flex py-8 justify-between gap-8 w-full">
          {/* Biểu đồ sách nhập về */}
          <div className="bg-white flex flex-col flex-1 p-4 rounded-[20px] border border-[#cdd5de] ">
            <div className="w-full h-full">
              {chartData && <BookImportChart data={chartData} />}
            </div>
          </div>
          {/* Lịch */}
          <div className="bg-white flex flex-col p-4 rounded-[20px] border border-[#cdd5de] w-fit">
            <div className="flex items-center justify-start h-full mb-3 gap-2">
              <div className="flex bg-gray-200 rounded-full p-2">
                <img src="/icon/calendar.svg" alt="Calendar Icon" />
              </div>
              <h3 className="text-[1.125rem] font-semibold">Lịch cá nhân</h3>
            </div>
            <BookCalendar />
          </div>
        </section>

        <div className="bg-white flex flex-col flex-1 p-4 rounded-[20px] border border-[#cdd5de]">
          <div className="flex items-center justify-start h-full mb-3 gap-2">
            <div className="flex bg-gray-200 rounded-full p-2">
              <img src="/icon/book.svg" alt="Book Icon" />
            </div>
            <h3 className="text-[1.125rem] font-semibold">
              Danh sách các sách
            </h3>
          </div>

          <div className="w-full h-full">
            <BookTable />
          </div>
        </div>

        {/* <div className="bg-white flex flex-col flex-1 p-4 rounded-[20px] mt-8 border border-[#cdd5de]">
          <div className="flex items-center justify-start h-full mb-3 gap-2">
            <div className="flex bg-gray-200 rounded-full p-2">
              <img src="/icon/book.svg" alt="Book Icon" />
            </div>
            <h3 className="text-[1.125rem] font-semibold">
              Bảng xếp hạng sách
            </h3>
          </div>

          <div className="w-full h-full">
            <Ranking
              books={[
                {
                  title: "Đắc Nhân Tâm",
                  author: "Dale Carnegie",
                  cover: "link_ảnh_1",
                },
                {
                  title: "Nhà Giả Kim",
                  author: "Paulo Coelho",
                  cover: "link_ảnh_2",
                },
                {
                  title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
                  author: "Rosie Nguyễn",
                  cover: "link_ảnh_3",
                },
              ]}
            />
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default Dashboard;
