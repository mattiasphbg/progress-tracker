"use server";

import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";
import z from "zod";

const deleteGoalSchema = z.object({
  id: z.number(),
});

export type DeleteGoalSchema = z.infer<typeof deleteGoalSchema>;

export async function deleteGoal(data: DeleteGoalSchema) {
  const validatedData = deleteGoalSchema.parse(data);
  await api.goals.delete(validatedData);
  revalidatePath("/dashboard");
}
