import { fetchDashboardStats } from "@/lib/api";
import StatCard from "@/components/analytics/StatCard";
import TopBlogs from "@/components/analytics/TopBlogs";
import DailyViewsChart from "@/components/analytics/DailyViewsChart";
import { Book, Eye, Users } from "lucide-react";

export default async function AnalyticsPage() {
  const data = await fetchDashboardStats();

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">📈 Analytics Dashboard</h1>
        <p className="text-muted-foreground">Failed to load analytics data.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">📈 Analytics Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Blogs"
          value={data.totalBlogs}
          icon={Book}
          iconBgColor="bg-blue-100"
        />
        <StatCard
          title="Total Views"
          value={data.totalViews}
          icon={Eye}
          iconBgColor="bg-green-100"
        />
        <StatCard
          title="Total Subscribers"
          value={data.totalSubscribers}
          icon={Users}
          iconBgColor="bg-purple-100"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DailyViewsChart data={data.dailyViews} />
        <TopBlogs blogs={data.topBlogs} />
      </div>
    </div>
  );
}
