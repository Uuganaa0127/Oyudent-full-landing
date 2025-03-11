"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Blog {
  id: number;
  title: string;
  content: string;
  banner: string;
  thumbnail: string;
  type: string;
}

const CourseDetail = () => {
  const { id } = useParams(); // ✅ Get the blog ID dynamically

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://103.41.112.95:3000/v1/course/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result: Blog = await response.json();
        setBlog(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <section className="max-w-[900px] mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">{blog.title}</h1>

      <div className="w-full h-72 relative mt-5 flex justify-center">
        <img
          src={`http://103.41.112.95:3000/images/${blog.thumbnail}`}
          alt={blog.title}
          // layout="fill"
          // objectFit="cover"
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

export default CourseDetail;
