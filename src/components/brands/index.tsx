"use client";
import React from "react";
import {
  FaTooth,
  FaFlask,
  FaHandsHelping,
  FaUserTie,
  FaShieldAlt,
  FaMoneyCheckAlt,
  FaChalkboardTeacher,
  FaUserCog,
  FaClipboardCheck,
  FaCar,
  FaWarehouse,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Breadcrumb from "../Common/Breadcrumb";

const Brands = () => {
  const coreValues = [
    {
      title: "Тоног төхөөрөмж",
      description:
        "Шүдний эмнэлгийн тоног төхөөрөмж: Суурин болон зөөврийн бор машин, гэрлийн аппарат, сувгийн мотор, микроскоп зэрэг бүх тоног төхөөрөмжүүд, хиймэл шүдний лабораторийн тоон болон аналог бүх тоног төхөөрөмжүүдийг ХБНГУ-ын Ritter, Renfert, Dentaururm, Японы Yamahachy, NSK, БНХАУ-ын Woodpecker, Runeys, БНСУ-ын Genoray, Dmetec зэрэг компаниудаас импортлон оруулж ирж байна.",
      icon: FaTooth,
    },
    {
      title: "Эмчилгээний материал",
      description:
        "Шүдний эмчилгээнд зориулсан бүх төрлийн материал оруулж ирж байна. Манай компани нь дэлхийд эм үйлдвэрлэлийн технологиоороо тэргүүлдэг Франц улсын Septodont компаний бүх төрлийн бүтээгдэхүүнийг 2022 оноос албан ёсны эрхтэйгээр оруулж ирж байгааг онцолж байна. Энэхүү компаний хэсгийн мэдээ алдауулах Lignospan тариа нь маш чанартай үйлчилгээ сайтай байдаг.",
      icon: FaFlask,
    },
    {
      title: "Багаж хэрэгсэл",
      description:
        "Бид үнэ болон чанарын олон сонголттойгоор Итали, Герман, Пакистан, Орос, Солонгос, Хятад улссас эмчилгээ, гажиг засал, лабораторид зориулсан гар багаж, хэрэгсэл, нэг удаагийн бүтээгдэхүүнийг Монгол улсын зах зээл дээр ханган нийлүүлж байна",
      icon: FaHandsHelping,
    },
  ];

  const humanResources = [
    {
      title: "Захирал",
      description: "Шүдний эмч мэргэжилтэй 27 жил мэргэжлээрээ ажилласан.",
      icon: FaUserTie,
    },
    { title: "Чанарын менежер", description: "Шүдний эмч", icon: FaShieldAlt },
    {
      title: "Худалдааны менежер",
      description: "Шүдний эмч",
      icon: FaMoneyCheckAlt,
    },
    {
      title: "Сургалтын менежер",
      description: "Шүдний эмч",
      icon: FaChalkboardTeacher,
    },
    { title: "Агуулахын эрхлэгч", description: "Эм зүйч", icon: FaWarehouse },
    {
      title: "Эмнэлгийн тоног төхөөрөмжийн инженер-2",
      description:
        "Эмнэлгийн тоног төхөөрөмжийн инженер, Мэдээллийн технологийн инженер",
      icon: FaUserCog,
    },
    {
      title: "Борлуулалтын ажилтан-3",
      description: "Шүдний техникч Сувилагч Шүдний эмнэлгийн туслах",
      icon: FaClipboardCheck,
    },
    { title: "Үйлчилгээ, түгээлтийн ажилтан-4", description: "", icon: FaCar },
  ];
  return (
    <>      <Breadcrumb title={"Бренд"} pages={["Бренд"]} />
    
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 text-gray-800 px-6">
        {/* Hero Section */}
        <section className="mx-auto py-20 px-6 flex flex-col items-center gap-12">
          {/* Logo Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <img
              src="images/logo/Oyudent.svg"
              alt="Company Logo"
              className="w-52 h-52"
            />
          </motion.div>

          {/* Company Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-gray-700"
          >

            <p className="text-lg leading-relaxed">
              Манай компани нь шүдний эмнэлгийн материал, тоног төхөөрөмж ханган
              нийлүүлэх чиглэлээр дагнан ажилладаг мэргэшсэн байгууллага юм.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Бид Герман, Япон, БНСУ, Итали, АНУ, Швейцарь зэрэг 30+ орны 100+
              чанарын баталгаатай брэндүүдийн бүтээгдэхүүнийг Монголын зах зээлд
              албан ёсны эрхтэйгээр импортлон нийлүүлдэг.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Монголын 350 гаруй эмнэлэг, эрүүл мэндийн байгууллагуудтай хамтран
              ажиллаж, сүүлийн үеийн дэвшилтэт технологи, шинэ материалуудыг
              салбарын эмч мэргэжилтнүүдэд хүргэж байна.
            </p>
          </motion.div>
        </section>

        {/* Core Values Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-green-700">
            Our Core Values
          </h2>
          <motion.div
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white shadow-md rounded-xl text-center flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <value.icon className="text-green-600 text-4xl mb-4" />
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-gray-600 mt-2">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Human Resource Section */}
        <section className="py-16 bg-green-50">
          <h2 className="text-3xl font-bold text-center text-green-700">
            Хүний нөөцийн мэргэшсэн байдал
          </h2>
          <motion.div
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {humanResources.map((item, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white shadow-md rounded-xl text-center flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <item.icon className="text-green-600 text-4xl mb-4" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Brands;
