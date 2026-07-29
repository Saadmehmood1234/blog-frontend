import { fetchDashboardStats } from "@/lib/api";
import AnalyticsClient from "@/components/analytics/AnalyticsClient";
import NoBlogs from "@/components/NoBlogs";
import { DashboardStats } from "@/types/Types";
import { cookies } from "next/headers";

export default async function AnalyticsPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const data: DashboardStats | null =
    await fetchDashboardStats(cookieHeader);

  if (!data) {
    return (
      <NoBlogs title="Failed." description="Failed to load analytics data." />
    );
  }

  return <AnalyticsClient data={data} />;
}
