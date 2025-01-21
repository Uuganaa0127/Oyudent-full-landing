"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import HeadBanner from "./HeadBanner";

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
 
const [data, setData] = useState<HeaderItem[]>([]); 
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
const [newItem, setNewItem] = useState<string>('');
const [image,setimage]= useState<string[] | null>(null);
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://103.41.112.95:3000/v1/banner');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data1: HeaderItem[] = await response.json();

      console.log(data1);
      
      setData(data1);

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);

    }
  };
  fetchData();

  // fetchData1();
}, []);
useEffect(()=>{
  console.log('pizda',data);
  
},[data])



  return (
    <section className="overflow-hidden py-20">
     
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <HeadBanner/>
{/* 
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
    > */}
        {/* <!-- promo banner big --> */}
        {/* <SwiperSlide>     */}
             {/* <div className="relative z-1 overflow-hidden rounded-lg bg-[#F5F5F7] py-12.5 lg:py-17.5 xl:py-22.5 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-7.5">
          <div  className="max-w-[550px] w-full">
            Сургалт
            <span  className="block font-medium text-xl text-dark mb-3">
              Apple iPhone 14 Plus piza
            </span>

            {data.map(a=>(
              <div>
            <h2  className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5">
              UP TO 30% OFF {a.id}
            </h2>
            <p>
              {a.description}
            </p>
            </div>))
            
}
            <a
              href="#"
              className="inline-flex font-medium text-custom-sm text-white bg-blue py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
            >
              Buy Now
            </a>
          </div>

          <Image
            src="/images/promo/promo-01.png"
            alt="promo img"
            className="absolute bottom-0 right-4 lg:right-26 -z-1"
            width={274}
            height={350}
          />
        </div> */}
        {/* </SwiperSlide> */}
       
        {/* </Swiper> */}
 
        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
       {/* <button className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5" onClick={handleAddItem() }/> */}
       
          {/* <!-- promo banner small --> */}
        {/* 
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
    > */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            {/* <Image
              // src={`http://103.41.112.95:3000/images/${data[0]?."image"}`}
              alt="promo img"
              className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-10 -z-1"
              width={241}
              height={241}
            /> */}

            <div className="text-right">
              <span className="block text-lg text-dark mb-1.5">
                Foldable Motorised Treadmill
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                Workout At Home
              </h2>

              <p className="font-semibold text-custom-1 text-teal">
                Flat 20% off
              </p>

              <a
                href="#"
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-9"
              >
                Grab Now
              </a>
            </div>
          </div>

          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <Image
              src="/images/promo/promo-03.png"
              alt="promo img"
              className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-8.5 -z-1"
              width={200}
              height={200}
            />

            <div>
              <span className="block text-lg text-dark mb-1.5">
                Apple Watch Ultra
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                Up to <span className="text-orange">40%</span> off
              </h2>

              <p className="max-w-[285px] text-custom-sm">
                The aerospace-grade titanium case strikes the perfect balance of
                everything.
              </p>

              <a
                href="#"
                className="inline-flex font-medium text-custom-sm text-white bg-orange py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-orange-dark mt-7.5"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PromoBanner;
