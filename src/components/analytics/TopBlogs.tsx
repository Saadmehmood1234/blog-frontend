import { TopBlog } from "@/lib/Types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TopBlogs({ blogs }: { blogs: TopBlog[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>🔥 Top Blogs</CardTitle>
        <CardDescription>
          The most viewed blogs on your platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blog</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="font-medium hover:underline"
                  >
                    {blog.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{blog.category.name}</Badge>
                </TableCell>
                <TableCell className="text-right">{blog.views}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
