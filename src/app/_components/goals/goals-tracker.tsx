"use client";

import { useState } from "react";
import { GoalCard } from "./goal-card";
import { StatsOverview } from "~/app/_components/goals/stats-overview";
import { AddGoalDialog } from "~/app/_components/goals/add-goal-dialog";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  category: "health" | "career" | "learning" | "personal";
  dueDate: string;
  color: string;
}

const INITIAL_GOALS: Goal[] = [
  {
    id: "1",
    title: "Read 12 Books",
    description: "Complete one book per month",
    progress: 7,
    target: 12,
    category: "learning",
    dueDate: "2025-12-31",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "2",
    title: "Run 100 Miles",
    description: "Build endurance and fitness",
    progress: 45,
    target: 100,
    category: "health",
    dueDate: "2025-12-31",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "3",
    title: "Learn TypeScript",
    description: "Master advanced TypeScript concepts",
    progress: 23,
    target: 30,
    category: "career",
    dueDate: "2025-09-30",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "4",
    title: "Save $5000",
    description: "Build emergency fund",
    progress: 3200,
    target: 5000,
    category: "personal",
    dueDate: "2025-12-31",
    color: "from-orange-500 to-red-500",
  },
];

export function GoalsTracker() {
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddGoal = (newGoal: Omit<Goal, "id">) => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
    };
    setGoals([...goals, goal]);
    setIsDialogOpen(false);
  };

  const handleUpdateProgress = (id: string, newProgress: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? { ...goal, progress: Math.min(newProgress, goal.target) }
          : goal,
      ),
    );
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const completedGoals = goals.filter((g) => g.progress >= g.target).length;
  const totalProgress = goals.reduce(
    (sum, g) => sum + g.progress / g.target,
    0,
  );
  const averageProgress = Math.round((totalProgress / goals.length) * 100);

  return (
    <div className="from-background via-background to-background min-h-screen bg-gradient-to-br">
      {/* Header */}
      <div className="border-border bg-card/50 sticky top-0 z-10 border-b backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-foreground text-3xl font-bold">
                Goal Tracker
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your progress and achieve your dreams
              </p>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Plus className="h-4 w-4" />
              New Goal
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <StatsOverview
          totalGoals={goals.length}
          completedGoals={completedGoals}
          averageProgress={averageProgress}
        />

        {/* Goals Grid */}
        <div className="mt-8">
          <h2 className="text-foreground mb-4 text-xl font-semibold">
            Your Goals
          </h2>
          {goals.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                No goals yet. Create one to get started!
              </p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-primary hover:bg-primary/90 gap-2"
              >
                <Plus className="h-4 w-4" />
                Create First Goal
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onUpdateProgress={handleUpdateProgress}
                  onDelete={handleDeleteGoal}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Goal Dialog */}
      <AddGoalDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddGoal={handleAddGoal}
      />
    </div>
  );
}
