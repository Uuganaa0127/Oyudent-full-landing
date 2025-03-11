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
    <div className="relative z-1 overflow-hidden rounded-3xl bg-[#F5F5F7] py-3 px-3 shadow-md bg-[#DBF4F3]">
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
      className="modern-carousel bg-[#DBF4F3] "
      
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative flex flex-col items-center justify-center w-full bg-[#DBF4F3]  h-[500px] sm:h-[600px] lg:h-[700px] bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden"
            style={{
              backgroundImage: `url(http://103.41.112.95:3000/images/${item.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

            <div className="relative z-10 text-center px-6 sm:px-12 animate-fadeIn">
  <h1 className="font-bold text-white text-2xl sm:text-4xl lg:text-5xl leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
    {item.title}
  </h1>
  <p className="text-white text-lg sm:text-2xl opacity-90 mt-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
    {item.description}
  </p>

  {item.buttonText && item.buttonLink && (
    <a
      href={item.buttonLink}
      className="inline-flex font-semibold text-white text-lg rounded-lg bg-blue-500/90 py-3 px-10 ease-out duration-300 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-400/50 mt-6 transform hover:scale-105 transition-all drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
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
          href={data.find((item) => item.buttonText && item.buttonLink)?.buttonLink || "#"}
          className="inline-flex font-semibold text-white text-lg rounded-lg bg-blue-600/90 py-3 px-10 ease-out duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-400/50 transform hover:scale-105 transition-all"
        >
          {data.find((item) => item.buttonText && item.buttonLink)?.buttonText || "Learn More"}
        </a>
      </div>
    )}
  </div>
  );
};

export default HeadBanner;
