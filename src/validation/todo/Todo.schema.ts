import { z } from 'zod';

import { TasksArraySchema } from './Tasks.schema';

export const TodoSchema = TasksArraySchema.merge(
  z.object({
    id: z.string().uuid(),
    title: z.string().refine(value => value, {
      message: 'Title is required',
    }),
    description: z
      .string()
      .refine(value => !value || (value && value.length <= 120), {
        message: 'Description length should be less or equal 120',
      }),
    deadline: z.string(),
    createdAt: z.string(),
    priority: z.enum(['medium', 'low', 'high']),
  }),
);

export type TodoModel = z.infer<typeof TodoSchema>;
export type TodoFormValues = TodoModel;
