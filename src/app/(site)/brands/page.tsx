import Brands from "@/components/brands";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Partners || Oyudent",
  description: "Тавтай морил",
};

const Brand = () => {
  return (
    <main>
      <Brands />
    </main>
  );
};

export default Brand;
