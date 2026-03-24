import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@/components/ui/Button'
import { ErrorAlert } from '@/components/ui/ErrorAlert'
import { FieldError } from '@/components/ui/FieldError'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { PageTitleSm } from '@/components/ui/PageTitle'
import { Textarea } from '@/components/ui/Textarea'
import {
  createPostFormSchema,
  type CreatePostFormValues,
} from '@/features/admin/validation/postForms'
import * as postsApi from '@/features/posts/api/postsApi'
import { useAuth } from '@/features/auth/useAuth'
import { getApiErrorMessage } from '@/lib/axios'

const Toolbar = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg};
`

const Form = styled.form`
  max-width: 42rem;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  align-items: center;
`

const MutedLink = styled(Link)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: underline;
  }
`

export function CreatePostPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: '',
      content: '',
      author: user?.name ?? '',
    },
  })

  useEffect(() => {
    if (user?.name) {
      setValue('author', user.name, { shouldDirty: false })
    }
  }, [user?.name, setValue])

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (values: CreatePostFormValues) => postsApi.createPost(values),
    onSuccess: (post) => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate(`/posts/${post.id}`)
    },
  })

  return (
    <>
      <Toolbar>
        <MutedLink to="/admin">← Voltar ao painel</MutedLink>
      </Toolbar>
      <PageTitleSm>Nova postagem</PageTitleSm>

      <Form
        noValidate
        onSubmit={handleSubmit((values) => {
          mutate(values)
        })}
      >
        {isError ? (
          <ErrorAlert role="alert">{getApiErrorMessage(error)}</ErrorAlert>
        ) : null}

        <FormField id="create-title" label="Título">
          <Input
            id="create-title"
            $block
            $wide
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'create-title-err' : undefined}
            {...register('title')}
          />
          <FieldError id="create-title-err" message={errors.title?.message} />
        </FormField>

        <FormField id="create-content" label="Conteúdo">
          <Textarea
            id="create-content"
            $block
            aria-invalid={Boolean(errors.content)}
            aria-describedby={errors.content ? 'create-content-err' : undefined}
            {...register('content')}
          />
          <FieldError id="create-content-err" message={errors.content?.message} />
        </FormField>

        <FormField id="create-author" label="Autor">
          <Input
            id="create-author"
            $block
            $wide
            aria-invalid={Boolean(errors.author)}
            aria-describedby={errors.author ? 'create-author-err' : undefined}
            {...register('author')}
          />
          <FieldError id="create-author-err" message={errors.author?.message} />
        </FormField>

        <Actions>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Publicando…' : 'Publicar post'}
          </Button>
          <MutedLink to="/admin">Cancelar</MutedLink>
        </Actions>
      </Form>
    </>
  )
}
