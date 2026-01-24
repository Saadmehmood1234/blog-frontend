import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { fetchBlogCategory, fetchBlogs } from "@/lib/api";
import { BlogType,Category } from "@/types/Types";
import SubscribeCard from "./SubscribeCard";

export async function BlogSidebar() {
  const blogs = await fetchBlogCategory();
  const Popular = await fetchBlogs();

  const categories = blogs?.data ?? [];
  const popularBlogs =
    Popular?.data
      ?.filter((blog: BlogType) => blog.views > 0 && !blog.isFeatured)
      .sort((a: BlogType, b: BlogType) => b.views - a.views)
      .slice(0, 3) ?? [];

  return (
    <aside className="space-y-10 sticky top-24">
      <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
        <h3 className="font-display font-bold text-lg mb-4">Topics</h3>
        <div className="flex flex-wrap gap-2">
          {categories?.map((cat: Category) => (
            <Link key={cat._id} href={`/blog/category/${cat.slug}`}>
              <Badge
                variant="secondary"
                className="px-3 py-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors rounded-full"
              >
                {cat.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary rounded-full"></span>
          Popular Reads
        </h3>
        <div className="space-y-6">
          {popularBlogs?.map((blog: BlogType, i: number) => (
            <Link
              key={blog._id}
              href={`/blog/${blog.slug}`}
              className="group block"
            >
              <div className="flex gap-4 items-start">
                <span className="font-display font-bold text-muted-foreground/30 group-hover:text-primary/50 transition-colors">
                  0{i + 1}
                </span>
                <div>
                  <h4 className="font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {blog.readTime} min read
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <SubscribeCard />
    </aside>
  );
}
