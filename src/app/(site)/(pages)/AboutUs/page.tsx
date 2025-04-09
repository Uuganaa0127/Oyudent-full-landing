import About from "@/components/about";
import Contact from "@/components/about";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About us || Oyudent",
  description: "Тавтай морил",
};

const AboutUS = () => {
  return (
    <main>
      <About />
    </main>
  );
};

export default AboutUS;
