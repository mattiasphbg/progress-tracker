"use server";

import type { UpdateGoalSchema } from "~/app/_components/dashboard/update-goals";
import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";

export async function updateGoal(data: UpdateGoalSchema) {
  await api.goals.update({
    id: data.id,
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    targetDate: data.targetDate,
    status: data.status,
  });
  revalidatePath("/dashboard");
}
