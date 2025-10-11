"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { date: "Jan 1", completed: 2 },
  { date: "Jan 8", completed: 5 },
  { date: "Jan 15", completed: 8 },
  { date: "Jan 22", completed: 12 },
  { date: "Jan 29", completed: 15 },
  { date: "Feb 5", completed: 20 },
  { date: "Feb 12", completed: 24 },
];

const chartConfig = {
  completed: {
    label: "Goals Completed",
    color: "hsl(var(--primary))",
  },
};

export function ProgressChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="border-b">
        <CardTitle>Progress Over Time</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="var(--color-completed)"
              strokeWidth={2}
              dot={{ fill: "var(--color-completed)", r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
