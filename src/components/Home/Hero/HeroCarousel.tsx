"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from 'react';

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";

const HeroCarousal = () => {

  const [data, setData] = useState<ApiResponseItem[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);


interface ApiResponseItem {
  image: string; // Define the expected properties from the API
}


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://103.41.112.95:3000/v1/banner');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        await response.json();
        const data1: ApiResponseItem[] = await response.json();
  
        console.log(data1);
        
        setData(data1);

        
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
  
      }
      
    };
    fetchData(); 
  },[]);
  
  return (
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
      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
        
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                30%
              </span>
              <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                Sale
                <br />
                Off
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <a href="#">True Wireless Noise Cancelling Headphone</a>
            </h1>

            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ipsum at risus euismod lobortis in
            </p>

            <a
              href="#"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
            >
              Shop Now
            </a>
          </div>
          {data.map((a,index)=>(
            
            console.log(a,'a'),
            
            <div key={index}>
            <Image
        //  src={`http://103.41.112.95:3000/images/${a.image}`}
         src={`http://103.41.112.95:3000/images/${a.image ?? 'default.jpg'}`}
              alt="headphone"
              width={351}
              height={358}
            />
          </div>
          ))};
        </div>
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                30%
              </span>
              <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                Sale
                <br />
                Off
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <a href="#">True Wireless Noise Cancelling Headphone</a>
            </h1>

            <p>
              Lorem ipsum dolor sit, consectetur elit nunc suscipit non ipsum
              nec suscipit.
            </p>

            <a
              href="#"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
            >
              Shop Now
            </a>
          </div>

          <div>
            <Image
              src="/images/hero/hero-01.png"
              alt="headphone"
              width={351}
              height={358}
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousal;
