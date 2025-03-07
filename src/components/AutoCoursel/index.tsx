"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const AutoLogoSlider = () => {
  const [data, setData] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await fetch("http://103.41.112.95:3000/v1/manufacturer");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        console.log(result,'ss');
        
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-10 mb-10">
      {loading && <p>Loading logos...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && data && (
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          grabCursor={true} // ✅ Allows manual swipe
          touchRatio={1.5} // ✅ Improves swipe responsiveness
          breakpoints={{
            480: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 5 },
          }}
        >
          {data.map((logo, index) => (
          
            <SwiperSlide key={index}>
              <img
                src={`http://103.41.112.95:3000/images/${logo.logo}`}
                alt={`Logo ${index + 1}`}
                className="w-[100px] h-[50px] md:w-[120px] md:h-[60px] lg:w-[150px] lg:h-[70px] mx-auto object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default AutoLogoSlider;
