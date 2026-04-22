import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  description: z.string().max(1000, 'Descrição muito longa').optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']).optional(),
})

export const updateTaskSchema = z
  .object({
    title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo').optional(),
    description: z.string().max(1000, 'Descrição muito longa').optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser fornecido',
  })

export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
