import { z } from 'zod';

export const TasksArraySchema = z.object({
  tasks: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
    }),
  ),
});

export type TasksArrayModel = z.infer<typeof TasksArraySchema>;
