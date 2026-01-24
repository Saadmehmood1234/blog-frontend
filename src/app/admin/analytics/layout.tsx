import { getCookies } from "@/lib/GetCookies";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCookies();
  if (!user) {
    redirect("/admin/auth/signin");
  }
  if (user.role !== "admin") {
    redirect("/admin/auth/signin");
  }
  return <div>{children}</div>;
}
