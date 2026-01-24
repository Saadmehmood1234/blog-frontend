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
    <div className="rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 border p-6 shadow-sm">
      <div className="flex max-sm:h-64 border p-3 shadow-md rounded-lg flex-col gap-2">
        <h2 className="text-xl font-semibold mb-4">
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
