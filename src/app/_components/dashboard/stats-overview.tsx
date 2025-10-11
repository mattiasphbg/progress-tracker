import { Card, CardContent } from "~/components/ui/card";
import { Target, TrendingUp, Award, Zap } from "lucide-react";

const stats = [
  {
    icon: Target,
    label: "Active Goals",
    value: "12",
    change: "+2 this week",
    changeType: "positive" as const,
  },
  {
    icon: TrendingUp,
    label: "Completion Rate",
    value: "78%",
    change: "+5% from last month",
    changeType: "positive" as const,
  },
  {
    icon: Award,
    label: "Goals Completed",
    value: "34",
    change: "+8 this month",
    changeType: "positive" as const,
  },
  {
    icon: Zap,
    label: "Current Streak",
    value: "15 days",
    change: "Keep it up!",
    changeType: "neutral" as const,
  },
];

export function StatsOverview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
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
