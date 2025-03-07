import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface BannerItem {
  id: number;
  thumbnail: string;
  title: string;
  description: string | null;
  type: string | null;
}

interface SmallBannerProps {
  banners: BannerItem[];
}

const SmallBanner: React.FC<SmallBannerProps> = ({ banners, head }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <p className="py-5 font-bold" >{head}</p>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="rounded-lg w-full"
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="relative overflow-hidden flex flex-col items-center justify-center text-center z-1 rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10"
            >
              <span className="block text-lg font-bold text-gray-700 mb-1.5">
                {item.title}
              </span>

              {/* ✅ Show description only if available */}
              {item.description && (
                <p className="text-gray-600 text-sm mb-3 bold">{item.description}</p>
              )}

              {/* ✅ Image */}
              <div className="w-full max-w-[400px] mx-auto flex justify-center items-center">
  <img
    style={{ width: "350px", height: "180px" }} // ✅ Fixed image size
    src={`http://103.41.112.95:3000/images/${item.thumbnail}`}
    alt={item.title}
    className="object-cover rounded-lg"
  />
</div>


              <a
                href={`/blogs/blog-details/${item.id}`}
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-5"
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
