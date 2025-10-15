"use server";

import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";
import {
  createGoalSchema,
  type CreateGoalSchema,
} from "~/app/_components/dashboard/create-goals";

export async function createGoal(data: CreateGoalSchema) {
  const validatedData = createGoalSchema.parse(data);
  await api.goals.create(validatedData);

  revalidatePath("/dashboard");
}
