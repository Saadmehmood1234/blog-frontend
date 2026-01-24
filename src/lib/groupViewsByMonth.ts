import { DailyView } from "@/types/Types";

export default function groupViewsByMonth(data: DailyView[]) {
  const monthlyMap: Record<string, number> = {};

  data.forEach(({ _id, views }) => {
    const date = new Date(_id);
    const monthKey = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    monthlyMap[monthKey] = (monthlyMap[monthKey] || 0) + views;
  });

  return Object.entries(monthlyMap).map(([month, views]) => ({
    month,
    views,
  }));
}
