"use client";

import { Menu, Search, PenSquare, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogType, Category } from "@/lib/Types";
import { useDebounce } from "@/hooks/useDebounce";

type Props = {
  categories: Category[];
};

export default function NavbarClient({ categories }: Props) {
  const location = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<BlogType[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs?search=${debouncedQuery}&limit=5`,
          { signal: controller.signal },
        );
        const data = await res.json();
        console.log(data);
        setSuggestions(data.data || []);
      } catch (err) {
        console.error("Search failed");
      }
    };

    fetchSuggestions();
    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <nav className="glass-nav w-full py-4 px-6 lg:px-12 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl cursor-pointer font-display font-black">
          DailyTech.
        </Link>

        <div className="hidden cursor-pointer lg:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/" passHref>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 ${
                location === "/" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Home
            </Button>
          </Link>

          {categories.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2 cursor-pointer gap-1 text-muted-foreground hover:text-foreground"
                >
                  Categories
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {categories.map((cat) => (
                  <DropdownMenuItem key={cat._id} asChild>
                    <Link href={`/blog/category/${cat.slug}`} className="cursor-pointer">{cat.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="max-sm:ml-2 flex relative w-48 sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <input
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              if (!value.trim()) {
                setSuggestions([]);
              }
            }}
            placeholder="Search blogs..."
            className="pl-9 pr-4 sm:py-2 py-1 bg-secondary/50 rounded-full text-sm w-full"
          />

          {suggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-background border rounded-md shadow-lg z-50">
              {suggestions.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog.slug}`}
                  onClick={() => {
                    setQuery("");
                    setSuggestions([]);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-secondary"
                >
                  {blog.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/write">
          <Button size="sm" className="hidden sm:flex gap-2 rounded-full">
            <PenSquare className="h-4 w-4" />
            Write
          </Button>
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-6 text-left">
              <SheetTitle className="font-display font-bold text-2xl">
                Scribe.
              </SheetTitle>
            </SheetHeader>
            <div className="flex p-4 flex-col gap-4 text-lg">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="font-medium hover:text-primary"
              >
                Home
              </Link>
              {categories?.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/blog/category/${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link href="/write" onClick={() => setIsOpen(false)}>
                <Button className="w-full rounded-full gap-2">
                  <PenSquare className="h-4 w-4" />
                  Start Writing
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
