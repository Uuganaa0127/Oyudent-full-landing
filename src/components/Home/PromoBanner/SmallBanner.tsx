import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export interface BannerItem {
  id: number;
  thumbnail: string;
  title: string;
  description: string | null;
  type: string | null;
}

interface SmallBannerProps {
  banners: BannerItem[];
  head: string;
}

const SmallBanner: React.FC<SmallBannerProps> = ({ banners, head }) => {
  return (
    <div className="w-full flex flex-col items-center py-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg">
      <p className="text-3xl font-extrabold mb-6 text-center">{head}</p>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="w-full rounded-xl overflow-hidden shadow-lg"
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative flex flex-col items-center justify-center text-center px-4 py-10 bg-[#DBF4F3] rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out">
              <div className="w-full h-[300px] mb-4 flex items-center justify-center rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/images/${item.thumbnail}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="block text-xl font-semibold text-teal-600 mb-3">
                {item.title}
              </span>
              <div className="h-[60px] max-w-md mb-4 text-sm md:text-base text-gray-700 overflow-hidden">
                <p className="line-clamp-3">{item.description || " "}</p>
              </div>
              <a
                href={
                  head === "Мэдээ"
                    ? `/blogs/blog-details/${item.id}`
                    : `/courses/course-detail/${item.id}`
                }
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 mb-3 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-5"
              >
                Read More
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SmallBanner;