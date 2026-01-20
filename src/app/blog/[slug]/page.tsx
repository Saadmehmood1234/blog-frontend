import { BlogSidebar } from "@/components/BlogSidebar";
import { format } from "date-fns";
import { Calendar, Clock, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { fetchBlogBySlug } from "@/lib/api";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import NoBlogs from "@/components/NoBlogs";
interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}
export default async function BlogDetail({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  const blog = await fetchBlogBySlug(slug);
  
  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col font-sans">
        <main className="grow container mx-auto px-6 max-w-7xl pt-8 pb-20">
          <div className="text-center">
            <h1 className="text-4xl font-display font-black mb-4"></h1>
            <p className="text-muted-foreground"></p>
          </div>
          <NoBlogs title="Blog not found" description="The article you&re looking for doesn&t exist."/>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <main className="grow container mx-auto px-6 max-w-7xl pt-8 pb-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8">
            <header className="mb-8">
              <div className="flex gap-2 mb-4">
                {blog.data.category && (
                  <Badge
                    variant="secondary"
                    className="rounded-full px-3 text-sm font-medium"
                  >
                    {blog.data.category.name}
                  </Badge>
                )}
                {blog.data.isFeatured && (
                  <Badge
                    variant="outline"
                    className="rounded-full border-primary/20 text-primary bg-primary/5"
                  >
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl text-primary md:text-5xl font-display font-black leading-tight mb-6">
                {blog.data.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    JD
                  </div>
                  <span className="font-medium text-foreground">
                    Saad Mehmood
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {format(
                    new Date(blog.data.createdAt || new Date()),
                    "MMM d, yyyy",
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {blog.data.readTime} min read
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                  <Eye className="h-4 w-4" />
                  {blog.data.views} views
                </div>
              </div>
            </header>
            <div className="aspect-2/1 bg-primary/10 rounded-2xl overflow-hidden mb-10 shadow-lg shadow-black/5">
              <Image
                height={100}
                width={100}
                src={
                  blog.data.featuredImage ||
                  "https://images.unsplash.com/photo-1499750310159-525446b0d568?w=1200&q=80"
                }
                alt={blog.data.title}
                className="w-full h-full object-cover"
              />
            </div>
            <MarkdownRenderer content={blog.data.content}/>
            {blog.data.tags && blog.data.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h4 className="font-bold text-sm uppercase tracking-wide text-muted-foreground mb-4">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {blog.data.tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="rounded-md px-3 py-1 text-sm hover:bg-muted transition-colors cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-10 p-6 bg-secondary/30 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold font-display">
                  Enjoyed this article?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Share it with your friends and colleagues.
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </article>
          <aside className="lg:col-span-4 hidden lg:block space-y-12">
            <BlogSidebar />
          </aside>
        </div>
      </main>
    </div>
  );
}
