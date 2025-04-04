import React from "react";

import { Metadata } from "next";
import CourseGridWithSideber from "@/components/CourseGridWithSideber";
export const metadata: Metadata = {
  title: "СУРГАЛТ || OYUDENT",
  description: "Тавтай морилно уу",
  // other metadata
};

const BlogGridWithSidebarPage = () => {
  return (
    <>
      <CourseGridWithSideber />
    </>
  );
};

export default BlogGridWithSidebarPage;
