"use client";

import React, { useEffect, useState } from "react";
import { apiService } from "../../../../apiService/page.tsx";
import {
  Button,
  Popover,
  Table,
  Tag,
  Image,
  Card,
  Modal,
  message,
} from "antd";
import dayjs from "dayjs";
import {
  CommentOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Comment from "../comment/page.tsx";
import { useRouter } from "next/navigation"; // ✅ Correct Import for Next.js 13+
import "./index.css";

export default function News() {
  const [allPost, setAllPost] = useState([]);
  const [isVisibleComments, setIsVisibleComments] = useState(false);
  const [isEditingData, setIsEditingData] = useState(null);
  const [allBanners, setBanners] = useState();
  const router = useRouter(); // ✅ Correctly using `useRouter`

  const deletePost = async (postId, bannerPath) => {
    const foundedBanner = allBanners?.find(
      (singleBanner) => singleBanner?.image === bannerPath
    );

    Modal.confirm({
      title: "Устгах",
      content: "Та мэдээг болон баннерыг устгахдаа итгэлтэй байна уу?",
      onOk: async () => {
        try {
          const postResponse = await apiService.callDelete(`/v1/blog/${postId}`);
          if (foundedBanner?.id) {
            await apiService.callDelete(`/banner/${foundedBanner?.id}`);
          } else {
            message.warning("Баннерийг устгаж чадсангүй");
          }
          getPost();
        } catch (error) {
          console.error("Error deleting post or banner:", error);
        }
      },
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 250,
    },
    {
      title: <div style={{ textAlign: "center" }}>Content</div>,
      dataIndex: "content",
      key: "content",
      width: 120,
      render: (text) => (
        <Popover
          title="Preview"
          trigger={["click"]}
          content={<div dangerouslySetInnerHTML={{ __html: text }} />}
        >
          <Button icon={<EyeOutlined />} type="text" />
        </Popover>
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Banner</div>,
      dataIndex: "banner",
      key: "banner",
      width: 180,
      render: (text) => (
        <Image
          src={`https://myspace.unitel.mn/${text}`}
          alt="Banner"
          style={{ width: "50px" }}
        />
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Created At</div>,
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      render: (createdAt) => (
        <div style={{ textAlign: "center" }}>
          {dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
      width: 200,
      render: (createdAt, record) => (
        <div>
          <Button
            onClick={() => {
              setIsEditingData(record);
              setIsVisibleComments(true);
            }}
            icon={<CommentOutlined />}
            type="text"
            style={{ marginRight: "10px" }}
          />
          <Button
            onClick={() => deletePost(record?.id, record?.banner)}
            icon={<DeleteOutlined />}
            type="text"
            danger
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getPost();
    getBanner();
  }, []);

  const getBanner = async () => {
    try {
      const apiResponse = await apiService.callGet(`/banner?size=100`);
      setBanners(apiResponse);
    } catch {
      console.error("Error fetching banners");
    }
  };

  const getPost = async () => {
    try {
      const apiResponse = await apiService.callGet(`/v1/blog`);
      setAllPost(apiResponse);
    } catch {
      console.error("Error fetching posts");
    }
  };

  // ✅ Fixed `navigate` function
  const navigateToCreate = () => {
    router.push("/newsCreate"); // ✅ Correct navigation for Next.js
  };

  return (
    <div>
      <Card title="News">
        <div style={{ margin: "10px" }}>
          <Button
            onClick={navigateToCreate}
            type="primary"
            icon={<PlusCircleOutlined />}
            style={{
              backgroundColor: "#46c800",
              color: "white",
              fontSize: "14px",
            }}
          >
            Create news
          </Button>
        </div>
        <Table
          size="small"
          scroll={{ x: 1200, y: 600 }}
          columns={columns}
          dataSource={allPost}
        />
      </Card>

      <Modal
        onCancel={() => setIsVisibleComments(false)}
        onOk={() => setIsVisibleComments(false)}
        width={1000}
        open={isVisibleComments}
      >
        <Comment content={isEditingData} />
      </Modal>
    </div>
  );
}
