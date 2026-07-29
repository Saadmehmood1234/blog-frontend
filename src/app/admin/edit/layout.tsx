import { getCurrentUser } from "@/lib/GetUser";
import { redirect } from "next/navigation";

export default async function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/admin/auth/signin");
  }

  return <>{children}</>;
}
