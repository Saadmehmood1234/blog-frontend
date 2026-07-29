"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DailyView } from "@/types/Types";
import { ViewsBarChart } from "./Barchart";

export default function DailyViewsChart({ data }: { data: DailyView[] }) {
  const chartData = [...data].reverse();

  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl border bg-card p-4 shadow-sm md:grid-cols-2 sm:p-6">
      <div className="flex min-h-72 flex-col gap-2 rounded-xl border bg-background p-4">
        <h2 className="text-lg font-semibold mb-4">
          Daily Views (Last 7 Days)
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="views"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <ViewsBarChart data={data} />
    </div>
  );
}
