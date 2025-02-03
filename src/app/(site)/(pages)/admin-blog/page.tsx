"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
// import Sidebar from "@/components/Sidebar";

// Dynamically import React-Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// Custom toolbar options
const toolbarOptions = [
  [{ header: [1, 2, false] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["link", "image"],
  ["clean"],
];

export default function Editor() {
  const [content, setContent] = useState("");

  // Handle Image Upload
  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // input.onchange = async () => {
    //   if (input.files) {
    //     const file = input.files[0];
    //     const formData = new FormData();
    //     formData.append("file", file);

    //     try {
    //       // Upload to API
    //       const response = await fetch("/api/upload", {
    //         method: "POST",
    //         body: formData,
    //       });

    //       const data = await response.json();
    //       if (data.url) {
    //         const quill = (window as any).quill;
    //         const range = quill.getSelection();
    //         quill.insertEmbed(range.index, "image", data.url);
    //       }
    //     } catch (error) {
    //       console.error("Upload failed:", error);
    //     }
    //   }
    // };
  };

  // Add image upload handler to Quill toolbar
  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: handleImageUpload,
      },
    },
  };

  return (
    <div className="flex mt-10">
      {/* <Sidebar /> */}
      
      <div className="flex-1 p-10">
        
        <h1 className="text-2xl font-bold mb-4">Rich Text Editor with Image Upload</h1>
        <ReactQuill value={content} onChange={setContent} modules={modules} className="bg-white rounded-md" />
      </div>
    </div>
  );
}

