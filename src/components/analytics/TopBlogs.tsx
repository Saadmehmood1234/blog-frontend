import { TopBlog } from "@/types/Types";

export default function TopBlogs({ blogs }: { blogs: TopBlog[] }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Top blogs</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your most-read content by lifetime views.
        </p>
      </div>
      <ul className="divide-y">
        {blogs.map((blog, index) => (
          <li
            key={blog._id}
            className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold">
                {index + 1}
              </span>
              <span className="truncate text-sm font-medium">{blog.title}</span>
            </div>
            <span className="shrink-0 rounded-full bg-primary/5 px-3 py-1 text-sm font-semibold">
              {new Intl.NumberFormat().format(blog.views)} views
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
