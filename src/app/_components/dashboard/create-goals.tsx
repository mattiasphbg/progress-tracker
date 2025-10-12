import z from "zod";
import { ZodProvider } from "@autoform/zod";
import { AutoForm } from "~/components/ui/autoform";

export const createGoalSchema = z.object({
  name: z.string().min(1, "Name is required").max(256, "Name too long"),
  description: z.string().optional(),
  startDate: z.coerce.date({
    error: "Start date is required",
  }),
  targetDate: z.coerce.date({
    error: "Target date is required",
  }),
  status: z.enum(["active", "completed", "paused"], {
    error: "Status is required",
  }),
});

export type CreateGoalSchema = z.infer<typeof createGoalSchema>;
const schemaProvider = new ZodProvider(createGoalSchema);

export default function CreateGoals({
  onGoalCreation,
}: {
  onGoalCreation: (data: CreateGoalSchema) => void;
}) {
  return (
    <div>
      <AutoForm schema={schemaProvider} onSubmit={onGoalCreation} withSubmit />
    </div>
  );
}
