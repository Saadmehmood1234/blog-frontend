import { getCurrentUser } from "@/lib/GetUser";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (user) {
    redirect("/admin/analytics");
  }
  return <div>{children}</div>;
}
