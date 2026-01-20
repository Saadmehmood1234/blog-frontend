import { TopBlog } from "@/lib/Types";

export default function TopBlogs({ blogs }: { blogs: TopBlog[] }) {
  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">🔥 Top Blogs</h2>
      <ul className="space-y-3">
        {blogs.map((blog, index) => (
          <li
            key={blog._id}
            className="flex justify-between items-center"
          >
            <span className="text-sm">
              {index + 1}. {blog.title}
            </span>
            <span className="text-sm font-medium">
              {blog.views} views
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
