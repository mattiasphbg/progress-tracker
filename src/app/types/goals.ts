export type GoalStatus = "active" | "completed" | "paused";

export type Goal = {
  id: number;
  clerkUserId: string;
  name: string | null;
  description: string | null;
  startDate: Date;
  targetDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type CreateGoalInput = {
  name: string;
  description?: string;
  startDate: Date;
  targetDate: Date;
  status: GoalStatus;
};

// Update goal input type
export type UpdateGoalInput = {
  id: number;
  name?: string;
  description?: string;
  startDate?: Date;
  targetDate?: Date;
  status?: GoalStatus;
};
