import { z } from "zod";
import { ActionSchema } from "../actions/schema.ts";

// SubStep can be a single action or array of 2+ actions
export const SubStepSchema = z.union([
  ActionSchema,
  z.tuple([ActionSchema, ActionSchema]).rest(ActionSchema),
]);

export const StepSchema = z.object({
  label: z.string().optional(),
  subSteps: z.array(SubStepSchema),
});

export type SubStep = z.infer<typeof SubStepSchema>;
export type Step = z.infer<typeof StepSchema>;
