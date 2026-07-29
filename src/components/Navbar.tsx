import { fetchBlogCategory } from "@/lib/api";
import NavbarClient from "./NavbarClient";
import { getCurrentUser } from "@/lib/GetUser";

export default async function Navbar() {
  const [categories, user] = await Promise.all([
    fetchBlogCategory().catch(() => ({ data: [] })),
    getCurrentUser().catch(() => null),
  ]);

  return (
    <NavbarClient
      categories={categories.data ?? []}
      isAuthenticated={user?.role === "admin"}
    />
  );
}
