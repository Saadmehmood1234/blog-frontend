"use client";

import Loading from "@/app/admin/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAllBlogs } from "@/lib/api";
import { BlogType } from "@/types/Types";
import { ArrowUpRight, Eye, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

export default function BlogViews() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllBlogs()
      .then((data) => setBlogs(data.sort((a, b) => b.views - a.views)))
      .catch(() => toast.error("Unable to load blog views"))
      .finally(() => setLoading(false));
  }, []);

  const filteredBlogs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return blogs;

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(normalizedQuery) ||
        blog.category?.name?.toLowerCase().includes(normalizedQuery),
    );
  }, [blogs, query]);

  if (loading) return <Loading />;

  const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);
  const averageViews = blogs.length ? Math.round(totalViews / blogs.length) : 0;
  const highestViews = blogs[0]?.views ?? 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "All blog views", value: totalViews },
          { label: "Average per blog", value: averageViews },
          { label: "Highest performing", value: highestViews },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border bg-card p-5 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-2 text-2xl font-bold">
              {formatNumber(item.value)}
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Views by blog</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Every blog ranked by its lifetime page views.
            </p>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search blogs or categories"
              className="pl-9"
            />
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-14 text-center">#</TableHead>
                <TableHead>Blog</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.length ? (
                filteredBlogs.map((blog, index) => (
                  <TableRow key={blog._id}>
                    <TableCell className="text-center text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md">
                        <p className="truncate font-medium">{blog.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {blog.readTime} min read
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {blog.category?.name ?? "Uncategorized"}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 font-semibold">
                        <Eye className="h-3.5 w-3.5" />
                        {formatNumber(blog.views)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" asChild>
                        <Link
                          href={`/blog/${blog.slug}`}
                          aria-label={`Open ${blog.title}`}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-28 text-center">
                    No matching blogs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
