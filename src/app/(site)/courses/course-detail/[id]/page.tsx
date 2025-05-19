"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { apiRequest, getTokenFromCookie } from "@/utils/api";

interface Course {
  id: number;
  title: string;
  content: string;
  banner: string;
  thumbnail: string;
  type: string;
}

const CourseDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCourse = async () => {
    try {
      const response = await apiRequest(`course/${id}`, "GET");
      setCourse(response);
      setLoading(false);
    } catch (err: any) {
      console.error("Failed to fetch course:", err);
      setError("Unable to load course details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getCourse();
    }
  }, [id]);

  const handleRegisterClick = async ()  => {
    const token = getTokenFromCookie();
    if (!token) {
      router.push("/signup"); // Redirect to signup if no token
    } else {
   
      const response = await apiRequest(`course/registration`, "POST",{
        "id": id
      });
if(response.status == 201){
  alert("📝 Success.");

}else if (response.status== 401){
  alert("📝 You are already registration.");

}
      // If token exists, you could send register request, or show success
      // Optionally, you can auto-submit registration request here
    }
  };

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto py-16 px-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
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

  if (!course) {
    return (
      <div className="flex justify-center items-center h-60 text-black text-lg font-semibold">
        Course not found.
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      {/* Course Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-black">{course.title}</h1>

      {/* Course Thumbnail */}
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-10 shadow-lg">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${course?.thumbnail}`}
          alt={course.title}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1024px"
          
        />
      </div>

      {/* Course Content */}
      <div
        className="prose lg:prose-lg max-w-none text-black prose-headings:text-black prose-p:text-black prose-img:rounded-lg prose-a:text-blue-600 prose-a:hover:underline leading-relaxed"
        dangerouslySetInnerHTML={{ __html: course.content }}
      />

      {/* Register Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handleRegisterClick}
          className="bg-blue-600 hover:bg-blue-700 text-black font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
        >
          Бүртгүүлэх
        </button>
      </div>
    </section>
  );
};

export default CourseDetail;
