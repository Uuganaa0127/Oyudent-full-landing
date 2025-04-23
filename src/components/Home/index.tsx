import React, { useEffect, useState } from "react";
// import BestSeller from "./BestSeller";
// import CounDown from "./Countdown";
// import Testimonials from "./Testimonials";
// import Newsletter from "../Common/Newsletter";
// import BrandsCoursel from "../BrandsCoursel";
// import Categories from "./Categories";
import NewArrival from "./NewArrivals";
// import Hero from "./Hero";

import { apiRequest } from "@/utils/api"; // ✅ Import API function

import AutoCoursel from "../AutoCoursel";
import PromoBanner from "./PromoBanner";

const Home = () => {
  const [data, setData] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchSpecial = async () => {

  //     const response = await apiRequest('content/special-product')
  //     setData(response)
  //   };

  //   fetchSpecial();
  // }, []);
  return (
    <main>
      <PromoBanner />

      {/* <CounDown /> */}
      {/* <Categories/> */}

      {/* {data && <Hero data={data} />} */}
      {/* <BrandsCoursel/> */}
      {/* <Categories /> */}
      <NewArrival />
      <AutoCoursel />

      {/* <BestSeller /> */}
      {/* <Testimonials /> */}
      {/* <Newsletter /> */}
    </main>
  );
};

export default Home;
