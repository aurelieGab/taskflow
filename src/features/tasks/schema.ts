import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Le titre est obligatoire')
    .max(100, 'Le titre fait 100 caractères max'),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
