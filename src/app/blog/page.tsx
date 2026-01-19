"use client";
import { BlogCard } from "@/components/BlogCard";
import Loading from "./loading";
import { fetchBlogCategory, fetchBlogsByFilter } from "@/lib/api";
import generateQuery from "@/lib/GenerateQuery";
import { BlogType, Category, QueryType } from "@/lib/Types";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogType[] | null>([]);
  const [category, setCategory] = useState<Category[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [filterBlogs, setFilterBlogs] = useState<QueryType>({
    title: "",
    category: "",
    tags: [],
    readTime: "",
    createdAt: "",
    page: 1,
  });

  useEffect(() => {
    const query = generateQuery(filterBlogs) as QueryType;

    async function fetchAll() {
      setLoading(true);
      try {
        const [blogsRes, categoryRes] = await Promise.all([
          fetchBlogsByFilter(query),
          fetchBlogCategory(),
        ]);
        setCategory(categoryRes.data);
        setBlogs(blogsRes.data.filter((d: BlogType) => !d.isFeatured));
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setBlogs([]);
        setCategory([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [filterBlogs]);

  if (loading) {
    return <Loading />;
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-75 text-muted-foreground">
        No blogs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full p-8">
      <div className="flex justify-start space-y-4 gap-4 flex-wrap w-full max-w-7xl">
        {category &&
          category?.map((cat) => (
            <Link href={`/category/${cat.slug}`} key={cat._id}>
              <span className="border-input border-2 hover:bg-secondary px-4 py-2 rounded-full text-center cursor-pointer">{cat.name}</span>
            </Link>
          ))}
      </div>
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.length > 0 &&
          blogs.map((blog) => (
            <div key={blog._id}>
              <BlogCard blog={blog} />
            </div>
          ))}
      </div>
    </div>
  );
}
