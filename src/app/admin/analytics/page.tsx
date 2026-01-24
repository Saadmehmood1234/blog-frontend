import { fetchDashboardStats } from "@/lib/api";
import AnalyticsClient from "@/components/analytics/AnalyticsClient";
import NoBlogs from "@/components/NoBlogs";

export default async function AnalyticsPage() {
  const data = await fetchDashboardStats();

  if (!data) {
    return (
      <NoBlogs title="Failed." description="Failed to load analytics data." />
    );
  }

  return <AnalyticsClient data={data} />;
}
