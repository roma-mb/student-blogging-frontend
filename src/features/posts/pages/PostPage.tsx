import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ErrorAlert } from '@/components/ui/ErrorAlert'
import * as postsApi from '@/features/posts/api/postsApi'
import { PostDetailSkeleton } from '@/features/posts/components/PostDetailSkeleton'
import { getApiErrorMessage } from '@/lib/axios'
import { formatDateTime } from '@/utils/formatDateTime'

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.space.lg};
  font-size: 0.875rem;
`

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.space.sm};
  font-size: clamp(1.35rem, 3.5vw, 1.85rem);
`

const Meta = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.xl};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Body = styled.article`
  line-height: 1.65;
  white-space: pre-wrap;
`

const LiveRegion = styled.p`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

export function PostPage() {
  const { postId } = useParams<{ postId: string }>()

  const {
    data: post,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => postsApi.getPostById(postId!),
    enabled: Boolean(postId),
  })

  if (!postId) {
    return <ErrorAlert>Post não encontrado.</ErrorAlert>
  }

  return (
    <>
      <BackLink to="/">← Voltar aos posts</BackLink>

      {isPending ? (
        <>
          <LiveRegion aria-live="polite">Carregando post…</LiveRegion>
          <PostDetailSkeleton />
        </>
      ) : null}

      {isError ? (
        <ErrorAlert role="alert">{getApiErrorMessage(error)}</ErrorAlert>
      ) : null}

      {post ? (
        <>
          <Title>{post.title}</Title>
          <Meta>
            Por {post.author} · Atualizado em {formatDateTime(post.updatedAt)}
          </Meta>
          <Body>{post.content}</Body>
        </>
      ) : null}
    </>
  )
}
