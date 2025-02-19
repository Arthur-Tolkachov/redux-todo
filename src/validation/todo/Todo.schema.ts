import { z } from 'zod';

export const TodoSchema = z.object({
  title: z
    .string()
    .nullable()
    .refine(value => value, {
      message: 'Title is required',
    }),
  description: z
    .string()
    .nullable()
    .refine(value => value && value.length <= 120, {
      message: 'Description length should be less or equal 120',
    }),
  deadline: z.string().nullable(),
  priority: z.enum(['normal', 'low', 'high']),
  tasks: z.array(
    z.object({
      id: z.string(),
      value: z
        .string()
        .min(2, {
          message: 'Task length should be more than 2',
        })
        .max(30, 'Task length should be less or equal 30'),
    }),
  ),
});

export type TodoModelSchema = z.infer<typeof TodoSchema>;
export type CreateTodoFormValues = TodoModelSchema;
