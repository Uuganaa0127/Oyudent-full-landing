import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import BrandsCoursel from "../BrandsCoursel";
import AutoCoursel from "../AutoCoursel";

const Home = () => {
  const [data, setData] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecial = async () => {
      try {
        const response = await fetch(
          "http://103.41.112.95:3000/v1/content/special-product"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        console.log(result, "ss");

        setData(result);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchSpecial();
  }, []);
  return (
    <main>
      <PromoBanner />

      {/* <CounDown /> */}
      <AutoCoursel />

      {/* {data && <Hero data={data} />} */}
      {/* <BrandsCoursel/> */}
      {/* <Categories /> */}
      {/* <NewArrival /> */}
      {/* <BestSeller /> */}
      {/* <Testimonials /> */}
      {/* <Newsletter /> */}
    </main>
  );
};

export default Home;
