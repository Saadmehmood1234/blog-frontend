"use client";

import { logout } from "@/lib/api";
import StatCard from "@/components/analytics/StatCard";
import TopBlogs from "@/components/analytics/TopBlogs";
import DailyViewsChart from "@/components/analytics/DailyViewsChart";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  BookOpen,
  Eye,
  FileText,
  FolderOpen,
  LogOut,
  PenSquare,
  PlusCircleIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DashboardStats } from "@/types/Types";
import { BlogDashBoard } from "./BlogDashBoard";
import Subscribers from "./Subscribers";
import { Suspense, useState } from "react";
import CreateCategory from "./CreateCategory";
import Categories from "./Categories";
import Loading from "@/app/admin/loading";
import BlogViews from "./BlogViews";

interface AnalyticsClientProps {
  data: DashboardStats;
}
export default function AnalyticsClient({ data }: AnalyticsClientProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "overview" | "views" | "content" | "audience"
  >("overview");

  const handleLogout = async () => {
    const res = await logout();
    if (res?.success) {
      toast.success("Logout Successfully");
      router.replace("/");
      router.refresh();
    }
  };

  const sections = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "views" as const, label: "Blog views", icon: Eye },
    { id: "content" as const, label: "Content", icon: BookOpen },
    { id: "audience" as const, label: "Audience", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 2xl:px-0">
        <header className="overflow-hidden rounded-3xl border bg-primary text-primary-foreground shadow-sm">
          <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Admin workspace
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                Content dashboard
              </h1>
              <p className="mt-2 max-w-xl text-sm text-white/65 sm:text-base">
                Track readership, manage stories, and understand what your
                audience enjoys.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
          <Link href="/admin/write">
            <Button
                  className="cursor-pointer gap-2 rounded-full bg-white text-primary hover:bg-white/90"
            >
              <PenSquare className="h-4 w-4" />
                  New blog
            </Button>
          </Link>
          <Button
            onClick={() => setIsOpen(true)}
                variant="outline"
                className="cursor-pointer gap-2 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            <PlusCircleIcon className="h-4 w-4" />
                New category
          </Button>
          <Button
            onClick={handleLogout}
                variant="ghost"
                className="cursor-pointer gap-2 rounded-full text-white/75 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
          </div>
        </header>

        <nav className="overflow-x-auto rounded-2xl border bg-card p-1.5 shadow-sm">
          <div className="flex min-w-max gap-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const active = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </nav>

        {activeSection === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <StatCard
                title="Total blogs"
                value={data.totalBlogs}
                description="Stories currently in your library"
                icon={<FileText className="h-5 w-5" />}
              />
              <StatCard
                title="Total views"
                value={data.totalViews}
                description="Lifetime reads across all content"
                icon={<Eye className="h-5 w-5" />}
              />
              <StatCard
                title="Categories"
                value={data.totalCategory}
                description="Topics used to organize your blog"
                icon={<FolderOpen className="h-5 w-5" />}
              />
            </div>

            <DailyViewsChart data={data.dailyViews} />
            <TopBlogs blogs={data.topBlogs} />
          </div>
        )}

        {activeSection === "views" && <BlogViews />}

        {activeSection === "content" && (
          <div className="space-y-6">
            <Suspense fallback={<Loading />}>
              <BlogDashBoard />
            </Suspense>
            <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Categories</h2>
                <p className="text-sm text-muted-foreground">
                  Organize the topics shown across your publication.
                </p>
              </div>
              <Suspense fallback={<Loading />}>
                <Categories />
              </Suspense>
            </section>
          </div>
        )}

        {activeSection === "audience" && (
          <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Subscribers</h2>
              <p className="text-sm text-muted-foreground">
                Review the readers subscribed to your updates.
              </p>
            </div>
            <Suspense fallback={<Loading />}>
              <Subscribers />
            </Suspense>
          </section>
        )}

      {isOpen && <CreateCategory setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
}
