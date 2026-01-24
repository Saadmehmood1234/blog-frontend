"use client";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer
} from "@/components/ui/chart";
import { DailyView } from "@/types/Types";
import groupViewsByMonth from "@/lib/groupViewsByMonth";

export function ViewsBarChart({ data }: { data: DailyView[] }) {
  const monthlyData = groupViewsByMonth(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Views</CardTitle>
        <CardDescription>Aggregated blog views</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={{
            views: {
              label: "Views",
              color: "#68d9a5",
            },
          }}
        >
          <BarChart
            data={monthlyData}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              axisLine={false}
              tickLine={false}
            />
            <XAxis type="number" hide />

            <Bar
              dataKey="views"
              radius={4}
              fill="#2819a5"
            >
              <LabelList
                dataKey="views"
                position="right"
                className="fill-foreground"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
