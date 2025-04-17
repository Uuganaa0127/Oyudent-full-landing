'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { apiRequest } from "@/utils/api";

type Partner = {
  id: number;
  name: string;
  picture: string;
  special: boolean;
  deletedAt: string | null;
  country: {
    id: number;
    name: string;
    code: number;
    deletedAt: string | null;
  };
};
const AutoLogoSlider = () => {
  const [data, setData] = useState<Partner[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
 

    fetchLogos();
  }, []);
  const fetchLogos = async () => {
    const response = await apiRequest(`content/partner`)
    console.log(response,'re');

    setData(response)

    if (data) {
      console.log(data, 'updated');
    }
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
         {data?.map((partner, index) => (
  <SwiperSlide key={index}>
    <img
      src={`${process.env.NEXT_PUBLIC_API_URL}/images/${partner.picture}`}
      alt={partner.name}
      className="w-[150px] h-[70px] bg-white rounded-xl p-2 object-contain mx-auto shadow"

    />
  </SwiperSlide>
))}
        </Swiper>
      )}
    </div>
  );
};

export default AutoLogoSlider;
