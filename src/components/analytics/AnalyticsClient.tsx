"use client";

import { logout } from "@/lib/api";
import StatCard from "@/components/analytics/StatCard";
import TopBlogs from "@/components/analytics/TopBlogs";
import DailyViewsChart from "@/components/analytics/DailyViewsChart";
import { Button } from "@/components/ui/button";
import { LogOut, PenSquare } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DashboardStats } from "@/types/Types";
import { BlogDashBoard } from "./BlogDashBoard";
import Subscribers from "./Subscribers";

interface AnalyticsClientProps {
  data: DashboardStats;
}
export default function AnalyticsClient({ data }: AnalyticsClientProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await logout();
    if (res?.success) {
      toast.success("Logout Successfully");
      router.push("/");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 2xl:px-0 py-8 space-y-8">
      <div className="flex sm:flex-row flex-col max-sm:gap-4 justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

        <div className="flex gap-4">
          <Link href="/admin/write">
            <Button size="sm" className="rounded-full cursor-pointer flex gap-2">
              <PenSquare className="h-4 w-4" />
              Write
            </Button>
          </Link>

          <Button
            onClick={handleLogout}
            size="sm"
            className="rounded-full cursor-pointer flex gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Total Blogs" value={data.totalBlogs} />
        <StatCard title="Total Views" value={data.totalViews} />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <DailyViewsChart data={data.dailyViews} />
        <TopBlogs blogs={data.topBlogs} />
      </div>
      <BlogDashBoard/>
      <Subscribers/>
    </div>
  );
}
