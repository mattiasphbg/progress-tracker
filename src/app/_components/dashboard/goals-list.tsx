"use client";

import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import type { Goal } from "~/app/types/goals";
import { Badge } from "~/components/ui/badge";
import { Plus, MoreVertical, Flag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CreateGoals, {
  type CreateGoalSchema,
} from "~/app/_components/dashboard/create-goals";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "~/components/ui/dialog";

import type { UpdateGoalSchema, UpdateGoalWithId } from "./update-goals";
import UpdateGoals from "./update-goals";

export function GoalsList({
  goals,
  createGoal,
  updateGoal,
}: {
  goals: Goal[];
  createGoal: (data: CreateGoalSchema) => void;
  updateGoal: (data: UpdateGoalWithId) => void;
}) {
  const [activeTab, setActiveTab] = useState("active");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const selectedGoalRef = useRef<Goal | null>(null);
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-accent/10 text-accent border-accent/20";
      case "low":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="border-b">
        <CardTitle>Your Goals</CardTitle>
        <CardAction>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Create Goal</DialogTitle>
              <CreateGoals
                onGoalCreation={(data) => {
                  createGoal(data);
                  setIsCreateDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
          <Dialog
            open={isUpdateDialogOpen}
            onOpenChange={setIsUpdateDialogOpen}
          >
            <DialogContent>
              <DialogTitle>Update Goal</DialogTitle>
              <UpdateGoals
                onGoalUpdate={(data) => {
                  if (selectedGoalRef.current?.id) {
                    updateGoal({ ...data, id: selectedGoalRef.current.id });
                    setIsUpdateDialogOpen(false);
                  }
                  setIsUpdateDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b px-6 pt-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active" className="mt-0">
            <div className="divide-y">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="hover:bg-secondary/50 p-6 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="mb-2 text-base font-semibold">
                            {goal.name}
                          </h3>
                          <div className="text-muted-foreground flex items-center gap-3 text-sm">
                            <Badge variant="outline" className="font-normal">
                              {goal.description}
                            </Badge>
                            {/* <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(goal.deadline).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                },
                              )}
                            </div> */}
                            <Badge
                              variant="outline"
                              className={getPriorityColor(goal.status)}
                            >
                              <Flag className="mr-1 h-3 w-3" />
                              {goal.status}
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setIsUpdateDialogOpen(true);
                                selectedGoalRef.current = goal;
                              }}
                            >
                              Edit Goal
                            </DropdownMenuItem>
                            <DropdownMenuItem>Mark Complete</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="font-medium">{goal.status}%</span>
                        </div>
                        {/* <Progress value={goal.status} className="h-2" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
