"use client";

import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { GoalCard } from "~/app/_components/goals/goal-card";
import { Loader2 } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  category: "health" | "career" | "learning" | "personal";
  dueDate: string;
  color: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function GoalsList() {
  const [goals] = useState<Goal[]>([]);
  const [loading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const filteredGoals =
    filter === "all" ? goals : goals.filter((goal) => goal.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          size="sm"
        >
          All ({goals.length})
        </Button>
        <Button
          variant={filter === "not-started" ? "default" : "outline"}
          onClick={() => setFilter("not-started")}
          size="sm"
        >
          Not Started
        </Button>
        <Button
          variant={filter === "in-progress" ? "default" : "outline"}
          onClick={() => setFilter("in-progress")}
          size="sm"
        >
          In Progress
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => setFilter("completed")}
          size="sm"
        >
          Completed
        </Button>
      </div>

      {filteredGoals.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              {filter === "all"
                ? "No goals yet. Create one to get started!"
                : `No ${filter} goals found.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdateProgress={() => {
                void 0;
              }}
              onDelete={() => {
                void 0;
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
