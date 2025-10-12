// src/app/(goals)/dashboard/actions/create-goal.ts
"use server";

import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";
import type { CreateGoalSchema } from "~/app/_components/dashboard/create-goals";

export async function createGoal(data: CreateGoalSchema) {
  await api.goals.create({
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    targetDate: data.targetDate,
    status: data.status,
  });

  revalidatePath("/dashboard");
}
