"use client";
import Loading from "@/app/admin/loading";
import { fetchBlogCategory } from "@/lib/api";
import { Category } from "@/types/Types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NoBlogs from "../NoBlogs";
import { CategoryTable } from "./CategoryTable";

const Categories = () => {
  const [categories, setCategories] = useState<Category[] | null>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await fetchBlogCategory();
        if (data.success) {
          setCategories(data.data);
        }
      } catch {
        toast.error("Error in fetching the Category");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!categories || categories.length === 0) {
    return (
      <div>
        <main>
          <NoBlogs
            title="No Category"
            description="There is no category found, Create a new"
          />
        </main>
      </div>
    );
  }
  return (
    <main>
      <section>
        {categories &&
          categories.length > 0 &&(<CategoryTable data={categories} />)}
      </section>
    </main>
  );
};

export default Categories;
