"use client";

import Loading from "@/app/admin/loading";
import { fetchBlogs } from "@/lib/api";
import { BlogType } from "@/types/Types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NoBlogs from "../NoBlogs";
import { BlogDataTable } from "./BlogDataTable";

export const BlogDashBoard = () => {
  const [blogs, setBlogs] = useState<BlogType[] | null>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await fetchBlogs();
        if (data?.success) {
          setBlogs(data.data);
          setLoading(false);
        }
      } catch {
        toast.error("Error in fetching the data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (!blogs || blogs.length === 0) {
    return (
      <NoBlogs
        title="No Blogs Found"
        description="There is no blogs available right now"
      />
    );
  }
  return <BlogDataTable data={blogs} />;
};
