import { BlogCard } from "@/components/BlogCard";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Button } from "@/components/ui/button";
import { fetchBlogs } from "@/lib/api";
import { BlogType } from "@/types/Types";
import Link from "next/link";
import NoBlogs from "./NoBlogs";

export const Home = async () => {
  const blogs = await fetchBlogs();
  const filteredBlog = blogs.data.filter((blog: BlogType) => blog.isFeatured);

  const featuredBlog = filteredBlog?.[0];
  const recentBlogs = blogs.data.filter((blog: BlogType) => !blog.isFeatured);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <main className="grow container mx-auto px-6 2xl:px-0 max-w-7xl pt-10 pb-20">
        {featuredBlog && (
          <section className="mb-20">
            <div key={featuredBlog._id}>
              <BlogCard blog={featuredBlog} />
            </div>
          </section>
        )}

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
              <h2 className="text-2xl font-display font-bold">
                Latest Stories
              </h2>
              <Link href="/blog">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground cursor-pointer"
                >
                  View All
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8 gap-y-12">
              {recentBlogs?.length ? (
                recentBlogs.map((blog: BlogType) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))
              ) : (
                <NoBlogs
                  title="Blog not found"
                  description="No blogs found yet. Be the first to write one!"
                />
              )}
            </div>

            <div className="mt-16 flex justify-center">
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="px-8 cursor-pointer rounded-full"
                >
                  Load All Articles
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
            <BlogSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};
