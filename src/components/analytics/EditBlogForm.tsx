"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { calculateReadTime } from "@/lib/CalculateReadTime";
import { fetchBlogBySlug, fetchBlogCategory, updateBlog } from "@/lib/api";
import { BlogType, Category } from "@/types/Types";
import { ArrowLeft, Eye, Loader2, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  tags: "",
  seoTitle: "",
  seoDescription: "",
};

export default function EditBlogForm({ slug }: { slug: string }) {
  const router = useRouter();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([fetchBlogBySlug(slug), fetchBlogCategory()])
      .then(([blogResponse, categoryResponse]) => {
        const currentBlog = blogResponse?.data;
        if (!currentBlog) {
          toast.error("Blog not found");
          router.replace("/admin/analytics");
          return;
        }

        setBlog(currentBlog);
        setCategories(categoryResponse.data ?? []);
        setForm({
          title: currentBlog.title,
          slug: currentBlog.slug,
          excerpt: currentBlog.excerpt,
          content: currentBlog.content,
          category: currentBlog.category?._id ?? "",
          tags: currentBlog.tags?.join(", ") ?? "",
          seoTitle: currentBlog.seoTitle ?? currentBlog.title,
          seoDescription:
            currentBlog.seoDescription ?? currentBlog.excerpt,
        });
      })
      .catch(() => toast.error("Unable to load the blog editor"))
      .finally(() => setLoading(false));
  }, [router, slug]);

  const setField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!blog) return;

    try {
      setSaving(true);
      const result = await updateBlog(blog._id, {
        title: form.title.trim(),
        slug: form.slug.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content,
        category: form.category,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        seoTitle: form.seoTitle.trim(),
        seoDescription: form.seoDescription.trim(),
        readTime: calculateReadTime(form.content),
      });

      toast.success(result?.message || "Blog updated successfully");
      router.replace("/admin/analytics");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update blog",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/admin/analytics"
              className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to dashboard
            </Link>
            <h1 className="text-3xl font-bold">Edit blog</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Update the story, metadata, and category.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href={`/blog/${blog.slug}`}>
              <Eye className="h-4 w-4" />
              Preview
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="grid gap-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-7 lg:grid-cols-[1fr_280px]">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(event) => setField("title", event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL slug</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(event) => setField("slug", event.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Changing this also changes the public blog URL.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(event) =>
                    setField("category", event.target.value)
                  }
                  required
                  className="h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={form.tags}
                  onChange={(event) => setField("tags", event.target.value)}
                  placeholder="technology, guide, tutorial"
                />
              </div>
            </div>

            <div>
              <Label>Current cover</Label>
              <div className="relative mt-2 aspect-[16/10] overflow-hidden rounded-xl border bg-muted">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                The existing cover image will be preserved.
              </p>
            </div>
          </section>

          <section className="space-y-5 rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={form.excerpt}
                onChange={(event) => setField("excerpt", event.target.value)}
                className="min-h-24"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={form.content}
                onChange={(event) => setField("content", event.target.value)}
                className="min-h-[520px] font-mono text-sm leading-relaxed"
                required
              />
              <p className="text-xs text-muted-foreground">
                Markdown is supported. Estimated read time:{" "}
                {calculateReadTime(form.content)} min.
              </p>
            </div>
          </section>

          <section className="grid gap-5 rounded-2xl border bg-card p-5 shadow-sm sm:p-7 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO title</Label>
              <Input
                id="seoTitle"
                value={form.seoTitle}
                onChange={(event) => setField("seoTitle", event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO description</Label>
              <Textarea
                id="seoDescription"
                value={form.seoDescription}
                onChange={(event) =>
                  setField("seoDescription", event.target.value)
                }
                className="min-h-20"
                required
              />
            </div>
          </section>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/analytics">Cancel</Link>
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
