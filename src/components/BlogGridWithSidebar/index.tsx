"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import BlogItem from "../Blog/BlogItem";
import blogData from "../BlogGrid/blogData";
import SearchForm from "../Blog/SearchForm";
import LatestPosts from "../Blog/LatestPosts";
import LatestProducts from "../Blog/LatestProducts";
import Categories from "../Blog/Categories";
import shopData from "../Shop/shopData";

const BlogGridWithSidebar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const categories = [
    {
      name: "Desktop",
      products: 10,
    },
    {
      name: "Laptop",
      products: 12,
    },
    {
      name: "Monitor",
      products: 30,
    },
    {
      name: "UPS",
      products: 23,
    },
    {
      name: "Phone",
      products: 10,
    },
    {
      name: "Watch",
      products: 13,
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://103.41.112.95:3000/v1/blog?limit=4");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data1 = await response.json();
      setData(data1);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb title={"Мэдээ"} pages={["Блог"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-7.5">
            {/* <!-- blog grid --> */}
            <div className="lg:max-w-[770px] w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-7.5">
                {data.map((blog, key) => (
                  <BlogItem blog={blog} key={key} />
                ))}
              </div>
            </div>

            {/* <!-- blog sidebar --> */}
            <div className="lg:max-w-[370px] w-full">
              {/* <!-- search box --> */}
              <SearchForm />

              {/* <!-- Recent Posts box --> */}
              <LatestPosts blogs={data} />

              {/* <!-- Latest Products box --> */}
              {/* <LatestProducts products={shopData} /> */}

              {/* <!-- Popular Category box --> */}
              {/* <Categories categories={categories} /> */}

              {/* <!-- Tags box --> */}
              {/* <div className="shadow-1 bg-white rounded-xl mt-7.5">
                <div className="px-4 sm:px-6 py-4.5 border-b border-gray-3">
                  <h2 className="font-medium text-lg text-dark">Tags</h2>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap gap-3.5">
                    <a
                      className="inline-flex hover:text-white border border-gray-3 py-2 px-4 rounded-md ease-out duration-200 hover:bg-blue hover:border-blue"
                      href="#"
                    >
                      Desktop
                    </a>

                    <a
                      className="inline-flex hover:text-white border border-gray-3 py-2 px-4 rounded-md ease-out duration-200 hover:bg-blue hover:border-blue"
                      href="#"
                    >
                      Macbook
                    </a>

                    <a
                      className="inline-flex hover:text-white border border-gray-3 py-2 px-4 rounded-md ease-out duration-200 hover:bg-blue hover:border-blue"
                      href="#"
                    >
                      PC
                    </a>

                    <a
                      className="inline-flex hover:text-white border border-gray-3 py-2 px-4 rounded-md ease-out duration-200 hover:bg-blue hover:border-blue"
                      href="#"
                    >
                      Watch
                    </a>

                    <a
                      className="inline-flex hover:text-white border border-gray-3 py-2 px-4 rounded-md ease-out duration-200 hover:bg-blue hover:border-blue"
                      href="#"
                    >
                      USB Cable
                    </a>

                    <a
                      className="inline-flex hover:text-white border border-gray-3 py-2 px-4 rounded-md ease-out duration-200 hover:bg-blue hover:border-blue"
                      href="#"
                    >
                      Mouse
                    </a>

                    <a
                      className="inline-flex hover:text-white border border-gray-3 py-2 px-4 rounded-md ease-out duration-200 hover:bg-blue hover:border-blue"
                      href="#"
                    >
                      Windows PC
                    </a>

                    <a
                      className="inline-flex hover:text-white border border-gray-3 py-2 px-4 rounded-md ease-out duration-200 hover:bg-blue hover:border-blue"
                      href="#"
                    >
                      Monitor
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogGridWithSidebar;
