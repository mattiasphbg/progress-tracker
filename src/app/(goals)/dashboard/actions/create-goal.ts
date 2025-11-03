"use server";

import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";
import { createGoalSchema } from "~/server/api/routers/goals";
import type { z } from "zod";

type CreateGoalSchema = z.infer<typeof createGoalSchema>;

export async function createGoal(data: CreateGoalSchema) {
  const validatedData = createGoalSchema.parse(data);
  await api.goals.create(validatedData);

  revalidatePath("/dashboard");
}
