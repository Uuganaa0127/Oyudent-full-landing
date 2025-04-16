'use client';

import React from 'react';
import 'swiper/css/pagination';
import 'swiper/css';
import HeadBanner from './HeadBanner';
import SmallBanner, { BannerItem } from './SmallBanner';
import { apiRequest } from "@/utils/api"; // ✅ Import API function

import { useEffect, useState } from 'react';

interface HeaderItem {
  id: number;
  image: string;
  image2: string | null;
  title: string;
  description: string;
  [key: string]: any; // Optional: if there are additional unknown properties
}

const PromoBanner = () => {
  const [data, setData] = useState<BannerItem[]>([]);
  const [data2, setData2] = useState<BannerItem[]>([]);

  useEffect(() => {

    
    const fetchData = async () => {
    const response = await apiRequest('blog?limit=10',"GET");

    setData(response);
      
    
    };
    const fetchCourse = async () => {
    const response = await apiRequest('course',"GET");
    setData2(response)
    };
    fetchCourse();
    fetchData();
  }, []);
  
  return (
    <section className="overflow-hidden pt-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <HeadBanner />

        {/* <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2"> */}
        {/* <div className="flex fond-bold justify-center py-10 "> */}

        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          {/* Pass the first two items from data to SmallBanner */}

          <SmallBanner head={'Мэдээ'} banners={data} />
          <SmallBanner head={'Сургалт'} banners={data2} />
        </div>
        {/* <SmallBanner /> */}
        {/* <SmallBanner/> */}
      </div>

      {/* </div> */}
    </section>
  );
};

export default PromoBanner;
