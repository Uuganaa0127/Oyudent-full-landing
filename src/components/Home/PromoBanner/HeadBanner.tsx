"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const HeadBanner = () => {
  const [data, setData] = useState<
    { title: string; image: string; description: string; buttonText?: string; buttonLink?: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasButton, setHasButton] = useState<boolean>(false); // ✅ Check if any slide has a button

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://103.41.112.95:3000/v1/banner");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);

        // ✅ Check if any slide has a button
        setHasButton(result.some((item) => item.buttonText && item.buttonLink));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative z-1 overflow-hidden rounded-lg bg-[#F5F5F7] py-1.5 lg:py-1.5 xl:pt-10 xl:py-2.5 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-1">
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
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex flex-col items-center justify-center w-full h-[500px] sm:h-[600px] lg:h-[700px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(http://103.41.112.95:3000/images/${item.image})`,
              }}
            >
              {/* ✅ Overlay to improve text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>

              <div className="relative z-10 text-center px-6 sm:px-12">
                <h1 className="font-semibold text-white text-xl sm:text-3xl lg:text-4xl mb-3">
                  {item.title}
                </h1>
                <p className="text-white text-lg sm:text-xl">{item.description}</p>

                {/* ✅ Show button if available (inside the banner) */}
                {item.buttonText && item.buttonLink && (
                  <a
                    href={item.buttonLink}
                    className="inline-flex font-medium text-white text-custom-sm rounded-md bg-blue-600 py-3 px-9 ease-out duration-200 hover:bg-blue-500 mt-5"
                  >
                    {item.buttonText}
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ If there's at least one button, render a separate button outside the image */}
      {hasButton && (
        <div className="mt-6 flex justify-center">
          <a
            href={data.find((item) => item.buttonText && item.buttonLink)?.buttonLink || "#"}
            className="inline-flex font-medium text-black text-lg rounded-md bg-blue-600 py-3 px-9 ease-out duration-200 hover:bg-blue-500"
          >
            {data.find((item) => item.buttonText && item.buttonLink)?.buttonText || "Learn More"}
          </a>
        </div>
      )}
    </div>
  );
};

export default HeadBanner;
