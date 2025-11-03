import { Card, CardContent } from "~/components/ui/card";
import { Target, TrendingUp, Award, CirclePause } from "lucide-react";
import type { Stats } from "~/app/(goals)/dashboard/page";

export function StatsOverview({ stats }: { stats: Stats }) {
  const displayStats = [
    {
      icon: Target,
      label: "Active Goals",
      value: stats.active.toString(),
      change: `${stats.total} total`,
      changeType: "positive" as const,
    },
    {
      icon: TrendingUp,
      label: "Completion Rate",
      value: `${stats.completionRate}%`,
      change: `${stats.completed} completed`,
      changeType: "positive" as const,
    },
    {
      icon: Award,
      label: "Goals Completed",
      value: stats.completed.toString(),
      change: "Total completed",
      changeType: "positive" as const,
    },
    {
      icon: CirclePause,
      label: "Paused Goals",
      value: stats.paused.toString(),
      change: `${stats.paused} paused`,
      changeType: "neutral" as const,
    },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {displayStats.map((stat, index) => (
        <Card key={index} className="border-border bg-card">
          <CardContent className="flex flex-col gap-3 p-6">
            <div className="flex items-center justify-between">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <stat.icon className="text-primary h-5 w-5" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p
                className={`text-xs ${
                  stat.changeType === "positive"
                    ? "text-accent"
                    : stat.changeType === "neutral"
                      ? "text-destructive"
                      : "text-muted-foreground"
                }`}
              >
                {stat.change}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
