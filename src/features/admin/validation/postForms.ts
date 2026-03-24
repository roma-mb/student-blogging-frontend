import { z } from 'zod'

export const createPostFormSchema = z.object({
  title: z.string().min(1, 'Informe o título').max(280, 'Título muito longo'),
  content: z.string().min(1, 'Informe o conteúdo'),
  author: z.string().min(1, 'Informe o autor').max(120, 'Nome do autor muito longo'),
})

export const editPostFormSchema = z.object({
  title: z.string().min(1, 'Informe o título').max(280, 'Título muito longo'),
  content: z.string().min(1, 'Informe o conteúdo'),
})

export type CreatePostFormValues = z.infer<typeof createPostFormSchema>
export type EditPostFormValues = z.infer<typeof editPostFormSchema>
