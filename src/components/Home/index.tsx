import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";

const Home = () => {
  return (
    <main>
      <PromoBanner />

      {/* <CounDown /> */}

      
      <Hero />

      {/* <Categories /> */}
      <NewArrival />
      {/* <BestSeller /> */}
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
