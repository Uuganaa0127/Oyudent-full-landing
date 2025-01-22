"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import HeadBanner from "./HeadBanner";
import  SmallBanner from "./SmallBannet"

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
 
        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">

       

         <SmallBanner/>
         <SmallBanner/>

        </div>

      </div>
    </section>
  );
};

export default PromoBanner;
