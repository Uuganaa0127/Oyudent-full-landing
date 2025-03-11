"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";

const HeroCarousal = ({ data }) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {data?.map((col, index) => (
        <SwiperSlide key={index}>
          <div className="relative flex flex-col sm:flex-row items-center p-4 sm:p-12  shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-300 ease-in-out">
            
            {/* Image Container with Fixed Aspect Ratio */}
            <div className="relative w-full sm:w-1/2 h-72 mb-4 sm:mb-0  bg-[#DBF4F3]">
              <Image
                src={`http://103.41.112.95:3000/images/${col.picture ?? "default.jpg"}`}
                alt="item-image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-md"
              />
            </div>

            {/* Text Content */}
            <div className="w-full sm:w-1/2 flex flex-col justify-between sm:pl-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="block text-lg sm:text-xl font-semibold text-blue-600">
                 {col?.size}
                </span>
               
              </div>

              <h1 className="font-semibold text-xl sm:text-3xl text-gray-900 mb-3">
                <a href="#">{col?.name}</a>
              </h1>

              <p className="text-sm sm:text-base text-gray-700 mb-4">{col?.description}</p>

              <a
                href="#"
                className="inline-flex font-medium bg-white bg-blue-600 text-black rounded-md py-2.5 px-6 ease-out duration-200 hover:bg-blue-700 mt-6 self-start"
              >
                Shop Now
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
