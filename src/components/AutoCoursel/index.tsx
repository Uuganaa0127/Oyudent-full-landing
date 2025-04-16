'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { apiRequest } from "@/utils/api";


const AutoLogoSlider = () => {
  const [data, setData] = useState<{ result: { logo: string }[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
 

    fetchLogos();
  }, []);
  const fetchLogos = async () => {
    const response = await apiRequest(`manufacturer?size=10&page=0`)
    setData(response)
  setLoading(false)
  };
  return (
    <div className="w-2/3 mx-auto  my-10">
      <p className="text-2xl font-extrabold mb-12 text-center">
        {'Хамтрагч байгууллагууд'}
      </p>
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
            480: { slidesPerView: 6 },
            768: { slidesPerView: 8 },
            1024: { slidesPerView: 6 },
          }}
        >
          {data?.result.map((logo: any, index) => (
            <SwiperSlide key={index}>
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/images/${logo.logo}`}
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
