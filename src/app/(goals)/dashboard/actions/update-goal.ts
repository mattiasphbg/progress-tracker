"use server";

import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";
import z from "zod";

const updateGoalSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(256),
  description: z.string().optional(),
  startDate: z.date().optional(),
  targetDate: z.date().optional(),
  status: z.enum(["active", "completed", "paused"]).optional(),
});

type UpdateGoalSchema = z.infer<typeof updateGoalSchema>;

export async function updateGoal(data: UpdateGoalSchema) {
  const validatedData = updateGoalSchema.parse(data);
  await api.goals.update(validatedData);
  revalidatePath("/dashboard");
}
