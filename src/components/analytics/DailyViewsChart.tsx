"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DailyView } from "@/lib/Types";

export default function DailyViewsChart({ data }: { data: DailyView[] }) {
  const chartData = [...data].reverse();

  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Daily Views (Last 7 Days)</h2>
      <div className="h-64">
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
    </div>
  );
}
