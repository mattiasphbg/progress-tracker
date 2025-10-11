import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CheckCircle2, Target, TrendingUp } from "lucide-react";

const activities = [
  {
    icon: CheckCircle2,
    title: "Completed goal",
    description: "Build Portfolio Website",
    time: "2 hours ago",
    color: "text-accent",
  },
  {
    icon: TrendingUp,
    title: "Progress update",
    description: "Launch Side Project - 80%",
    time: "5 hours ago",
    color: "text-primary",
  },
  {
    icon: Target,
    title: "New goal created",
    description: "Learn Spanish",
    time: "1 day ago",
    color: "text-muted-foreground",
  },
  {
    icon: CheckCircle2,
    title: "Milestone reached",
    description: "Complete React Course - 50%",
    time: "2 days ago",
    color: "text-accent",
  },
];

export function RecentActivity() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="border-b">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-4">
              <div className={`mt-0.5 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-muted-foreground text-sm">
                  {activity.description}
                </p>
                <p className="text-muted-foreground text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
