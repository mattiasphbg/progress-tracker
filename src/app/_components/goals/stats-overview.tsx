"use client";

import { Card } from "~/components/ui/card";
import { Target, CheckCircle2, TrendingUp } from "lucide-react";

interface StatsOverviewProps {
  totalGoals: number;
  completedGoals: number;
  averageProgress: number;
}

export function StatsOverview({
  totalGoals,
  completedGoals,
  averageProgress,
}: StatsOverviewProps) {
  const stats = [
    {
      label: "Total Goals",
      value: totalGoals,
      icon: Target,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Completed",
      value: completedGoals,
      icon: CheckCircle2,
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Average Progress",
      value: `${averageProgress}%`,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="border-border overflow-hidden border"
          >
            <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-foreground mt-2 text-3xl font-bold">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`rounded-lg bg-gradient-to-br p-3 ${stat.color} bg-opacity-10`}
                >
                  <Icon className="text-foreground h-6 w-6 opacity-60" />
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
