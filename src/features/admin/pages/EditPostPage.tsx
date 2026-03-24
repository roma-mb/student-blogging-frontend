import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@/components/ui/Button'
import { ErrorAlert } from '@/components/ui/ErrorAlert'
import { FieldError } from '@/components/ui/FieldError'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { PageTitleSm } from '@/components/ui/PageTitle'
import { Textarea } from '@/components/ui/Textarea'
import * as postsApi from '@/features/posts/api/postsApi'
import { PostDetailSkeleton } from '@/features/posts/components/PostDetailSkeleton'
import {
  editPostFormSchema,
  type EditPostFormValues,
} from '@/features/admin/validation/postForms'
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

const AuthorNote = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const LoadHint = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.textMuted};
`

export function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    data: post,
    isPending: isLoadingPost,
    isError: isLoadError,
    error: loadError,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => postsApi.getPostById(id!),
    enabled: Boolean(id),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditPostFormValues>({
    resolver: zodResolver(editPostFormSchema),
    defaultValues: { title: '', content: '' },
  })

  useEffect(() => {
    if (post) {
      reset({ title: post.title, content: post.content })
    }
  }, [post, reset])

  const {
    mutate,
    isPending: isSaving,
    isError: isSaveError,
    error: saveError,
  } = useMutation({
    mutationFn: (values: EditPostFormValues) => postsApi.updatePost(id!, values),
    onSuccess: (updated) => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] })
      void queryClient.invalidateQueries({ queryKey: ['post', id] })
      navigate(`/posts/${updated.id}`)
    },
  })

  if (!id) {
    return <ErrorAlert>Post não encontrado.</ErrorAlert>
  }

  return (
    <>
      <Toolbar>
        <MutedLink to="/admin">← Voltar ao painel</MutedLink>
      </Toolbar>
      <PageTitleSm>Editar postagem</PageTitleSm>

      {isLoadingPost ? (
        <>
          <LoadHint>Carregando dados do post…</LoadHint>
          <PostDetailSkeleton />
        </>
      ) : null}

      {isLoadError ? (
        <ErrorAlert role="alert">{getApiErrorMessage(loadError)}</ErrorAlert>
      ) : null}

      {post && !isLoadingPost ? (
        <Form
          noValidate
          onSubmit={handleSubmit((values) => {
            mutate(values)
          })}
        >
          <AuthorNote>
            Autor (somente leitura na API): <strong>{post.author}</strong>
          </AuthorNote>

          {isSaveError ? (
            <ErrorAlert role="alert">{getApiErrorMessage(saveError)}</ErrorAlert>
          ) : null}

          <FormField id="edit-title" label="Título">
            <Input
              id="edit-title"
              $block
              $wide
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'edit-title-err' : undefined}
              {...register('title')}
            />
            <FieldError id="edit-title-err" message={errors.title?.message} />
          </FormField>

          <FormField id="edit-content" label="Conteúdo">
            <Textarea
              id="edit-content"
              $block
              aria-invalid={Boolean(errors.content)}
              aria-describedby={errors.content ? 'edit-content-err' : undefined}
              {...register('content')}
            />
            <FieldError id="edit-content-err" message={errors.content?.message} />
          </FormField>

          <Actions>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Salvando…' : 'Salvar alterações'}
            </Button>
            <MutedLink to={`/posts/${post.id}`}>Ver post público</MutedLink>
          </Actions>
        </Form>
      ) : null}
    </>
  )
}
