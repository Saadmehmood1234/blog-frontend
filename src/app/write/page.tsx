"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Category } from "@/lib/Types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { generateSlug } from "@/lib/GenerateSlug";
import { calculateReadTime } from "@/lib/CalculateReadTime";
import { createBlogs, fetchBlogCategory } from "@/lib/api";

export default function Write() {
  const [categories, setCategories] = useState<Category[] | null>([]);
  const [loading, setLaoding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    categoryId: "",
    tags: "",
    featuredImage: "",
    seoDescription: "",
    seoTitle: "",
    readTime: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLaoding(true);

    try {
      if (!formData.title || !formData.content || !formData.categoryId) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const payload = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        category: formData.categoryId,
        tags: formData.tags.split(",").map((t) => t.trim()),
        featuredImage: formData.featuredImage,
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
        slug: generateSlug(formData.title),
        readTime: calculateReadTime(formData.content),
      };

      await createBlogs(payload);
      toast.success("Blog published successfully!");
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        categoryId: "",
        tags: "",
        featuredImage: "",
        seoDescription: "",
        seoTitle: "",
        readTime: 0,
      });
    } catch (error) {
      toast.error("Failed to publish blog");
    } finally {
      setLaoding(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlogCategory();
      setCategories(data.data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <main className="grow container mx-auto px-6 max-w-4xl pt-10 pb-20">
        <div className="mb-10">
          <h1 className="text-3xl font-display font-bold">Write a new story</h1>
          <p className="text-muted-foreground mt-2">
            Share your thoughts with the world.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-card p-8 rounded-2xl shadow-sm border border-border/50"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a captivating title..."
              className="text-lg font-medium"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(val) =>
                  setFormData({ ...formData, categoryId: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="design, tech, tutorial"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Cover Image URL (optional)</Label>
            <Input
              id="image"
              placeholder="https://images.unsplash.com/..."
              value={formData.featuredImage}
              onChange={(e) =>
                setFormData({ ...formData, featuredImage: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              Use a landscape image for best results.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="A short summary of your post..."
              className="h-20 resize-none"
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown supported)</Label>
            <Textarea
              id="content"
              placeholder="Start writing your story..."
              className="min-h-100 font-mono text-sm leading-relaxed"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>SEO Title</Label>
              <Input
                placeholder="SEO optimized title"
                value={formData.seoTitle}
                onChange={(e) =>
                  setFormData({ ...formData, seoTitle: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>SEO Description</Label>
              <Input
                placeholder="SEO description"
                value={formData.seoDescription}
                onChange={(e) =>
                  setFormData({ ...formData, seoDescription: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="cursor-pointer px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2  h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Story"
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
