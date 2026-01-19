import { fetchDashboardStats } from "@/lib/api";
import StatCard from "@/components/analytics/StatCard";
import TopBlogs from "@/components/analytics/TopBlogs";
import DailyViewsChart from "@/components/analytics/DailyViewsChart";

export default async function AnalyticsPage() {
  const data = await fetchDashboardStats();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">📈 Analytics Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Total Blogs" value={data.totalBlogs} />
        <StatCard title="Total Views" value={data.totalViews} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DailyViewsChart data={data.dailyViews} />
        <TopBlogs blogs={data.topBlogs} />
      </div>
    </div>
  );
}
