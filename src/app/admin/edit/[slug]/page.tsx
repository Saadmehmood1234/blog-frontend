import EditBlogForm from "@/components/analytics/EditBlogForm";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EditBlogForm slug={slug} />;
}
