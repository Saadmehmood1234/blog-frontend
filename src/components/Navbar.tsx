import { fetchBlogCategory } from "@/lib/api";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const categories = await fetchBlogCategory();

  return <NavbarClient categories={categories?.data ?? []} />;
}
