import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Le nom est obligatoire')
    .max(50, 'Le nom doit faire 50 caractères max'),
  description: z.string().trim().max(200, 'La description doit faire 200 caractères max'),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
