"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api"; // ✅ Import API function

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const HeadBanner = () => {
  const [data, setData] = useState<
    {
      title: string;
      image: string;
      description: string;
      buttonText?: string;
      buttonLink?: string;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasButton, setHasButton] = useState<boolean>(false); // ✅ Check if any slide has a button
  const [data1,setData1]=useState<String|null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRequest('banner',"GET")
        setData(response)
        setHasButton(response.some((item) => item.buttonText && item.buttonLink));
        setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative z-1 overflow-hidden rounded-3xl shadow-lg">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className="modern-carousel"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex flex-col items-center justify-center w-full h-[500px] sm:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden bg-cover bg-center shadow-md"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/images/${item.image})`,
              }}
            >
              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>

              {/* Content */}
              <div className="relative z-10 text-center px-6 sm:px-12 animate-fadeIn">
                <h1 className="text-[#fcf3f2] font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-tight drop-shadow-[3px_3px_10px_rgba(0,0,0,0.9)] stroke-black">
                  {item.title}
                </h1>

                <p
                  className="text-[#f4f6f6] text-lg sm:text-2xl opacity-95 mt-4 bg-black/60 px-4 py-2 rounded-lg"
                  style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 1)" }}
                >
                  {item.description}
                </p>

                {/* Button with Visibility Fix */}
                {item.buttonText && item.buttonLink && (
                  <a
                    href={item.buttonLink}
                    className="mt-6 inline-flex items-center justify-center font-semibold text-lg text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-full py-3 px-10 transition-all ease-out duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    {item.buttonText}
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Floating Button Outside Carousel (if applicable) */}
      {hasButton && (
        <div className="mt-8 flex justify-center">
          <a
            href={
              data.find((item) => item.buttonText && item.buttonLink)
                ?.buttonLink || "#"
            }
            className="inline-flex font-semibold text-white text-lg rounded-lg bg-blue-600/90 py-3 px-10 ease-out duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-400/50 transform hover:scale-105 transition-all"
          >
            {data.find((item) => item.buttonText && item.buttonLink)
              ?.buttonText || "Learn More"}
          </a>
        </div>
      )}
    </div>
  );
};

export default HeadBanner;
