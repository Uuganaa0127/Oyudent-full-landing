import Contact from "@/components/Contact";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About us || Oyudent",
  description: "Тавтай морил",
};

const AboutUS = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default AboutUS;
