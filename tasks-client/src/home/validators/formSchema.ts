import { z } from 'zod';

const errorMessage = 'Preencha um valor';

export const formSchema = z.object({
  title: z.string().refine((val) => val !== '', {
    message: errorMessage,
  }),
  id: z.number(),
  created_at: z.string(),
  completed: z.boolean(),
});

export type FormType = z.infer<typeof formSchema>;
