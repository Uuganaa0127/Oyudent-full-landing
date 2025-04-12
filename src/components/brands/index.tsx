"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../Common/Breadcrumb";
import { FaSpinner } from "react-icons/fa";

type Partner = {
  id: number;
  name: string;
  logo: string;
  special: boolean;
  deletedAt: string | null;
  country: {
    code: number;
    name: string;
    deletedAt: string | null;
  };
};

const Brands = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ result: Partner[]; total: number } | null>(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(9);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [page, size]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://103.41.112.95:3000/v1/manufacturer?size=${size}&page=${page}`
      );
      
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const json = await response.json();
      console.log(json,'res');

      setData(json);
      console.log(data);
      
      setTotalPages(json.total / size);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <>
      <Breadcrumb title={"Бренд"} pages={["Бренд"]} />
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.result?.map((partner) => (
              <motion.div
                key={partner.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300"
              >
                <img
                  src={`http://103.41.112.95:3000/images/${partner.logo}`}
                  alt={partner.name}
                  className="w-24 h-24 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold mb-1">{partner.name}</h3>
                <p className="text-sm text-gray-500">{partner.country?.name}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
          >
            Previous
          </button>
          <span className="text-sm font-medium">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page + 1 >= totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Brands;
