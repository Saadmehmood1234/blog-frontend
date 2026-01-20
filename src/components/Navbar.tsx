import { fetchBlogCategory } from "@/lib/api";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  let categories;
  try {
    categories = await fetchBlogCategory();
  } catch (error) {
    // Handle API errors gracefully during build time
    categories = { data: [] };
  }

  return <NavbarClient categories={categories.data ?? []} />;
}
