import Link from "next/link";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogType } from "@/types/Types";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface BlogCardProps {
  blog: BlogType;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  if (blog?.isFeatured) {
    return (
      <Link href={`/blog/${blog.slug}`} className="group block">
        <article className="grid md:grid-cols-2 gap-8 items-center cursor-pointer">
          <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-muted shadow-sm group-hover:shadow-md transition-all duration-300">
            <Image
              src={
                blog.featuredImage ||
                "https://images.unsplash.com/photo-1499750310159-525446b0d568?w=1600&q=80"
              }
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          <div className="space-y-4">
            {blog.category && (
              <Badge
                variant="secondary"
                className="font-medium rounded-full px-3"
              >
                {blog.category.name}
              </Badge>
            )}
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight group-hover:text-primary/80 transition-colors">
              {blog.title}
            </h2>
            <div className="text-muted-foreground text-lg line-clamp-3 leading-relaxed">
              <ReactMarkdown>{blog.excerpt}</ReactMarkdown>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
              <span>
                {format(new Date(blog.createdAt || new Date()), "MMM d, yyyy")}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {blog.readTime} min read
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${blog.slug}`} className="group block h-full">
      <article className="flex flex-col h-full bg-card hover:bg-muted/30 p-4 -mx-4 rounded-xl transition-colors duration-200">
        <div className="relative aspect-16/11 overflow-hidden rounded-xl bg-muted mb-4">
          <Image
            src={
              blog.featuredImage ||
              "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80"
            }
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>

        <div className="flex flex-col grow space-y-3">
          {blog.category && (
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              {blog.category.name}
            </span>
          )}
          <h3 className="text-xl font-display font-bold leading-snug group-hover:text-primary/80 transition-colors">
            {blog.title}
          </h3>
          <div className="text-muted-foreground text-sm line-clamp-2 leading-relaxed grow">
            <ReactMarkdown>{blog.excerpt}</ReactMarkdown>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 mt-auto">
            <span>
              {format(new Date(blog.createdAt || new Date()), "MMM d, yyyy")}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {blog.readTime} min read
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
