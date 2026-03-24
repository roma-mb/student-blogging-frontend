import type { Post, PostEntityApi } from '@/features/posts/types'

export function mapPostEntity(entity: PostEntityApi): Post {
  return {
    id: entity._id.value,
    title: entity._title,
    content: entity._content,
    author: entity._author,
    createdAt: entity._createdAt,
    updatedAt: entity._updatedAt,
  }
}
