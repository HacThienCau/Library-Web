// BookCarousel.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";

const BookCarousel = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
    useEffect(()=>{
        console.log("Images: ",images)
    },[])
  return (
    <div className="w-80 md:w-120">
      {/* Main Swiper */}
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, Navigation]}
        className="w-full h-[400px] mb-4"
      >
        {Array.isArray(images) &&
          images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={index}
                className="w-full h-full object-contain rounded-xl"
              />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Thumbs Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress={true}
        modules={[Thumbs]}
        className="w-full h-[100px]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={index}
              className="w-full h-full object-cover rounded-lg border hover:border-blue-500 cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookCarousel;
