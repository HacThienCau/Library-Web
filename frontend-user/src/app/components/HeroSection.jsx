"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

import { ChevronRight } from "lucide-react";

import BookSection from "./BookSection";
import ImageCarousel from "./ImageCarousel";

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

export function HeroSection() {
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
    <h2 className="text-2xl font-bold text-sky-700 ">Có thể bạn sẽ thích</h2>
    <a href="/suggested" className="text-sky-700 hover:underline flex items-center">
      Xem thêm <span className="ml-1">➔</span>
    </a>
  </div>

  <div className="flex gap-6 overflow-x-auto scrollbar-hide">
    {[
      { title: 'Dám bị ghét', image: 'https://tiki.vn/blog/wp-content/uploads/2024/08/dam-bi-ghet-3.jpg' },
      { title: 'Đắc nhân tâm', image: 'https://nhasachphuongnam.com/images/detailed/217/dac-nhan-tam-bc.jpg' },
      { title: 'Sapiens', image: 'https://pos.nvncdn.com/fd5775-40602/ps/20240406_W0tedT95s7.jpeg' },
      { title: 'Tâm lý học hành vi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-OVbBcoqmgF3wBUGdB72sJqxj118br0bXAQ&s' },
      { title: 'Thiên nga đen', image: 'https://bizweb.dktcdn.net/100/197/269/products/thien-nga-den-1.png?v=1581061915587' },
    ].map((book, idx) => (
      <div key={idx} className="flex flex-col items-center min-w-[100px]">
        <img
          src={book.image}
          alt={book.title}
          className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm"
        />
        <p className="mt-2 text-center text-sm font-medium text-gray-800">{book.title}</p>
      </div>
    ))}
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
                  books={section.books}
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
