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
  const { id } = useParams(); // ✅ Get the blog ID dynamically

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchBlog();
  }, [id]);
  const fetchBlog = async () => {
    const response = await apiRequest(`blog/${id}`,"GET")
    setBlog(response)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <section className="max-w-[900px] mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">{blog.title}</h1>

      <div className="w-full h-72 relative mt-5 flex justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${blog.thumbnail}`}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <div
        className="mt-6 text-lg text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </section>
  );
};

export default BlogDetail;
