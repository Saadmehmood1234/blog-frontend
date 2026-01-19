import { Suspense } from "react";
import NavbarClient from "./NavbarClient";
import { fetchBlogCategory, fetchBlogs } from "@/lib/api";

export default async function Navbar() {
  const [categories] = await Promise.all([fetchBlogCategory(), fetchBlogs()]);

  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <NavbarClient categories={categories.data} />
    </Suspense>
  );
}

function NavbarSkeleton() {
  return <div className="h-16 w-full bg-secondary/30 animate-pulse" />;
}
