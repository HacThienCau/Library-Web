"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart } from "lucide-react"; // dùng icon từ lucide-react (hoặc FontAwesome tuỳ bạn)

export default function BookSection({ title, books, slug }) {
  const router = useRouter();

  return (
    <section className="bg-white my-6 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
      <div className="flex overflow-x-auto gap-8 pb-3">
        {books.map((book, idx) => (
          <div
            key={idx}
            className="relative group  rounded-lg p-3 shadow hover:shadow-md transition"
          >
            <div className="relative overflow-hidden rounded h-[180px] w-[150px] flex justify-center">
              <Image
                src={book.image}
                alt={book.title}
                width={120}
                height={180}
                className="rounded object-cover h-full transition-transform duration-300 group-hover:scale-115"
              />
              {/* Hover buttons */}
              <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center gap-2">
                  <button className="bg-gray-100 px-2 py-2 rounded shadow hover:bg-sky-500 text-sky-500 hover:text-white transition">
                  <ShoppingCart size={18} />
                </button>

                <button
                  className="bg-sky-500 text-white font-semibold px-3 py-2 text-sm rounded hover:bg-gray-100 hover:text-sky-500 transition"
                  onClick={() => alert("Mượn ngay")}
                >
                  Mượn ngay
                </button>
              
              </div>
            </div>
            <h3 className="text-sm font-medium truncate mt-2">{book.title}</h3>
            <p className="text-xs text-yellow-500">
              {"★".repeat(book.rating || 4)}
            </p>
            <p className="text-green-600 text-sm font-semibold">
              ● {book.status}
            </p>
          </div>
        ))}
      </div>
      <div className="text-right mt-2">
        <button
          className="text-blue-600 text-sm hover:underline"
          onClick={() => router.push(`/collections/${slug}`)}
        >
          Xem thêm &gt;&gt;
        </button>
      </div>
    </section>
  );
}
