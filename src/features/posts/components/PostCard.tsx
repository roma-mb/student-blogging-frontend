import { Link } from 'react-router-dom'
import styled from 'styled-components'
import type { Post } from '@/features/posts/types'
import { excerpt } from '@/utils/excerpt'

const Card = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space.lg};
  background: ${({ theme }) => theme.colors.surface};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`

const CardTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.space.sm};
  font-size: 1.125rem;
  font-weight: 600;
`

const CardTitleLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`

const Meta = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.sm};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`

export function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <CardTitle>
        <CardTitleLink to={`/posts/${post.id}`}>{post.title}</CardTitleLink>
      </CardTitle>
      <Meta>Por {post.author}</Meta>
      <Description>{excerpt(post.content)}</Description>
    </Card>
  )
}
