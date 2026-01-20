import { BlogCard } from "@/components/BlogCard";
import { Badge } from "@/components/ui/badge";
import { fetchBlogCategoryBySlug } from "@/lib/api";
import { BlogType } from "@/lib/Types";
import NoBlogs from "@/components/NoBlogs";
interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}
export default async function CategoryPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const BlogData = await fetchBlogCategoryBySlug(slug);

  if (!BlogData) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-sans">
        <main className="grow container mx-auto px-6 max-w-7xl pt-12 pb-20">
          <NoBlogs
            title="Category not found"
            description="The category you're looking for doesn't exist."
          />
        </main>
      </div>
    );
  }

  const category = BlogData.data?.[0]?.category;

  const nonFeaturedBlogs = BlogData.data?.filter(
    (blog: BlogType) => !blog.isFeatured,
  );

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <main className="grow container mx-auto px-6 max-w-7xl pt-12 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 text-muted-foreground border-muted-foreground/30"
          >
            Category
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-black mb-4 capitalize">
            {category?.name || slug}
          </h1>
          <p className="text-lg text-muted-foreground">
            {category?.description ||
              `Explore our latest thoughts and stories about ${category?.name || slug}.`}
          </p>
        </div>

        <div
          className={`${nonFeaturedBlogs ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12" : ""}`}
        >
          {nonFeaturedBlogs && nonFeaturedBlogs.length > 0 ? (
            nonFeaturedBlogs.map((blog: BlogType) => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          ) : (
            <NoBlogs
              title="No posts found in this category."
              description="Check back later for new content."
            />
          )}
        </div>
      </main>
    </div>
  );
}
