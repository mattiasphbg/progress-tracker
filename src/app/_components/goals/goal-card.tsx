"use client";

import { useState } from "react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Trash2, Edit2, Check } from "lucide-react";

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

interface GoalCardProps {
  goal: Goal;
  onUpdateProgress: (id: string, newProgress: number) => void;
  onDelete: (id: string) => void;
}

const CATEGORY_COLORS = {
  health:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  career: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  learning:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  personal:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export function GoalCard({ goal, onUpdateProgress, onDelete }: GoalCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(goal.progress.toString());

  const progressPercentage = Math.round((goal.progress / goal.target) * 100);
  const isCompleted = goal.progress >= goal.target;

  const handleSave = () => {
    const newProgress = Math.min(Number.parseInt(editValue) || 0, goal.target);
    onUpdateProgress(goal.id, newProgress);
    setIsEditing(false);
  };

  const handleIncrement = () => {
    onUpdateProgress(goal.id, Math.min(goal.progress + 1, goal.target));
  };

  return (
    <Card className="border-border hover:border-primary/50 overflow-hidden border transition-colors">
      {/* Header with gradient */}
      <div className={`h-2 bg-gradient-to-r ${goal.color}`} />

      <div className="p-6">
        {/* Title and Category */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-foreground text-lg font-semibold">
              {goal.title}
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {goal.description}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${CATEGORY_COLORS[goal.category]}`}
          >
            {goal.category}
          </span>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-foreground text-sm font-medium">
                Progress
              </span>
              <span className="text-primary text-sm font-semibold">
                {progressPercentage}%
              </span>
            </div>
            <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
              <div
                className={`h-full bg-gradient-to-r ${goal.color} transition-all duration-300`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Progress Input */}
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Input
                  type="number"
                  min="0"
                  max={goal.target}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="h-8 text-sm"
                  autoFocus
                />
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="bg-primary hover:bg-primary/90 h-8 px-2"
                >
                  <Check className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <span className="text-muted-foreground text-sm">
                  {goal.progress} / {goal.target}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="ml-auto h-8 px-2"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Completion Badge */}
        {isCompleted && (
          <div className="mt-4 rounded-lg bg-emerald-50 p-2 text-center dark:bg-emerald-900/20">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              ✓ Goal Completed!
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
          <span className="text-muted-foreground text-xs">
            Due: {new Date(goal.dueDate).toLocaleDateString()}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(goal.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
