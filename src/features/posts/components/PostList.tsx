import styled from 'styled-components'
import type { Post } from '@/features/posts/types'
import { PostCard } from '@/features/posts/components/PostCard'

const List = styled.ul`
  list-style: none;
  margin: ${({ theme }) => theme.space.xl} 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <List>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </List>
  )
}
