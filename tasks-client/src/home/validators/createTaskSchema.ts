import { z } from 'zod';

const errorMessage = 'Preencha um valor';

export const createTaskSchema = z.object({
  title: z.string().refine((val) => val !== '', {
    message: errorMessage,
  }),
});

export type CreateTaskType = z.infer<typeof createTaskSchema>;
