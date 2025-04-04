'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import HeadBanner from './HeadBanner';
import SmallBanner, { BannerItem } from './SmallBanner';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<string>('');
  const [image, setimage] = useState<string[] | null>(null);
  const [data2, setData2] = useState<BannerItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://103.41.112.95:3000/v1/blog?limit=10'
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data1: BannerItem[] = await response.json();

        console.log(data1, 'data1');

        setData(data1);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    const fetchCourse = async () => {
      try {
        const response = await fetch('http://103.41.112.95:3000/v1/course');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data1: BannerItem[] = await response.json();

        console.log(data1, 'data2');

        setData2(data1);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
    fetchData();

    // fetchData1();
  }, []);
  useEffect(() => {
    // console.log('pizda',data);
  }, [data]);
  const filteredData = data.filter(
    (item) => item.type === 'surgalt' || item.type === 'news'
  );

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
