"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { apiRequest } from "@/utils/api";

interface Blog {
  id: number;
  title: string;
  content: string;
  banner: string;
  thumbnail: string;
  type: string;
}

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
    console.log('sda');

      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await apiRequest(`blog/${id}`, "GET");
      setBlog(response);
      setLoading(false);
    } catch (err: any) {
      console.error("Failed to fetch blog:", err);
      setError("Unable to load blog details.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto py-12 px-4 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
        <div className="w-full h-[300px] bg-gray-200 rounded-lg mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-60 text-red-500 text-lg font-semibold">
        {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-60 text-black text-lg font-semibold">
        Blog not found.
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center mb-10 leading-tight text-black">
        {blog.title}
      </h1>

      {/* Thumbnail Image */}
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-10 shadow-lg">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${blog.thumbnail}`}
          alt={blog.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1024px"
          priority
        />
      </div>

      {/* Content */}
      <div
        className="prose lg:prose-xl max-w-none text-black prose-headings:text-black prose-p:text-black prose-img:rounded-lg prose-a:text-blue-600 prose-a:hover:underline"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </section>
  );
};

export default BlogDetail;
