"use client";

import { z } from "zod";
import { ZodProvider } from "@autoform/zod";
import { AutoForm } from "~/components/ui/autoform";

const updateGoalSchema = z.object({
  name: z.string().min(1).max(256),
  description: z.string().optional(),
  startDate: z.date().optional(),
  targetDate: z.date().optional(),
  status: z.enum(["active", "completed", "paused"]).optional(),
});

export type UpdateGoalSchema = z.infer<typeof updateGoalSchema>;
export type UpdateGoalWithId = UpdateGoalSchema & { id: number };
export const schemaProvider = new ZodProvider(updateGoalSchema);

export default function UpdateGoals({
  onGoalUpdate,
}: {
  onGoalUpdate: (data: UpdateGoalSchema) => void;
}) {
  return (
    <div>
      <AutoForm schema={schemaProvider} onSubmit={onGoalUpdate} withSubmit />
    </div>
  );
}
