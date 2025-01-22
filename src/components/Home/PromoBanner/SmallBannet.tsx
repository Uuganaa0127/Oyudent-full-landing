import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SmallBanner = () => {
  return (
    <div className="flex-col  items-center">

  <h2 className="flex w-full items-center font-bold text-xl lg:text-heading-4 text-dark mb-2.5 justify-center">     
  
   Сургалт</h2>
 

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="rounded-lg"
      >
        {/* Slide 1 */}
        <SwiperSlide>
            
          <div className="relative overflow-hidden flex z-1 rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <div className="text-right">
              <span className="block text-lg text-dark mb-1.5">
                Foldable Motorised Treadmill
              </span>
              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                Workout At Home
              </h2>
              <p className="font-semibold text-custom-1 text-teal">
                Flat 25% off
              </p>
              <a
                href="#"
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-9"
              >
                Grab Now
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative overflow-hidden flex z-1 rounded-lg bg-black py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <div className="text-right">
              <span className="block text-lg text-dark mb-1.5">Limited Offer</span>
              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                Workout At Home
              </h2>
              <p className="font-semibold text-custom-1 text-teal">Flat 20% off</p>
              <a
                href="#"
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-9"
              >
                Grab Now
              </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SmallBanner;
