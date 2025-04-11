"use client";

import Sidebar from "@/app/components/sidebar/Sidebar";
import { Button } from "@/app/components/ui/button";
import { ChevronDown, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8081/books/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Nhóm theo tên thể loại cha
  const grouped = categories.reduce((acc, curr) => {
    if (!acc[curr.tenTheLoaiCha]) {
      acc[curr.tenTheLoaiCha] = [];
    }
    acc[curr.tenTheLoaiCha].push(curr);
    return acc;
  }, {});

  return (
    <div className="flex flex-row w-full min-h-screen bg-[#EFF3FB]">
      <Sidebar />
      <div className="flex flex-col py-6 w-full md:ml-52 px-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📚 Danh mục sách</h1>
          <Button
            className="bg-[#062D76] rounded-xl flex gap-2"
            onClick={() => router.push("/books/categories/addCategory")}
          >
            <PlusCircle className="w-5 h-5" />
            Thêm danh mục
          </Button>
        </div>

        {loading ? (
          <p>Đang tải danh mục...</p>
        ) : (
          Object.entries(grouped).map(([tenTheLoaiCha, danhMucCon]) => (
            <div
              key={tenTheLoaiCha}
              className="bg-white rounded-xl shadow p-5 mb-4"
            >
              <div className="text-lg font-semibold flex items-center gap-2 text-[#062D76]">
                <ChevronDown className="w-4 h-4" />
                {tenTheLoaiCha}
              </div>
              <ul className="ml-6 mt-2 list-disc">
                {danhMucCon.map((item, idx) => (
                  <li key={idx} className="text-gray-700">
                    {item.tenTheLoaiCon} – {item.viTri}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}