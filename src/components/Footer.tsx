"use client";
import { fetchBlogCategory } from "@/lib/api";
import { Category } from "@/lib/Types";
import { Github, InstagramIcon, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Subscribe from "./Subscribe";
import { useEffect, useState } from "react";
import Loading from "@/app/blog/loading";

export function Footer() {
  const [categories, setCategories] = useState<Category[] | null>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const category = await fetchBlogCategory();

        if (category.data && Array.isArray(category.data)) {
          setCategories(category.data);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <footer className="border-t border-border mt-20 py-12 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link
              href="/"
              className="text-2xl font-display font-black tracking-tighter mb-4 block"
            >
              DailyTech.
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A modern publishing platform for thoughtful writers and readers.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Discover</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {categories &&
                categories.slice(0, 4).map((cat: Category) => (
                  <li key={cat._id}>
                    <Link
                      href={`/blog/category/${cat.slug}`}
                      className="hover:text-foreground"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {}
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <Subscribe isModal={false} />
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center text-md text-muted-foreground">
          <p>© 2024 Scribe Platform. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="https://x.com/SaadMeh97739578"
              className="hover:text-foreground inline-flex justify-center items-center gap-1"
            >
              <Twitter size={16} />
              <span>Twitter</span>
            </a>
            <a
              href="https://www.linkedin.com/in/saad-mehmood-4a6036255"
              className="hover:text-blue-500 inline-flex justify-center items-center gap-1"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/saadmehmood030"
              className="hover:text-rose-500 inline-flex justify-center items-center gap-1"
            >
              <InstagramIcon size={16} />
              <span>Instagram</span>
            </a>
            <a
              href="https://github.com/Saadmehmood1234"
              className="hover:text-gray-500 inline-flex justify-center items-center gap-1"
            >
              <Github size={16} />
              <span>Github</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
