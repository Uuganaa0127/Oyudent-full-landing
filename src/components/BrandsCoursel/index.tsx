
"use client";
import React, { useEffect, useRef } from "react";

const logos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export default function LogoCarousel() {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    let scrollAmount = 1;
    const maxScroll = carouselRef.current.scrollWidth / 2;

    const scrollCarousel = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += scrollAmount;
        
        if (carouselRef.current.scrollLeft >= maxScroll) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scrollCarousel, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-4 overflow-hidden relative">
      <div
        ref={carouselRef}
        className="flex space-x-6 w-full max-w-lg overflow-x-scroll scrollbar-hide whitespace-nowrap"
        style={{
          scrollBehavior: "smooth",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="h-20 w-20 flex items-center justify-center bg-gray-200 text-black text-3xl font-bold rounded-full shadow-md mx-2"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
