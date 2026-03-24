import { apiClient } from '@/lib/axios'
import { mapPostEntity } from '@/features/posts/api/mappers'
import type {
  CreatePostRequest,
  CreatePostResponse,
  GetPostResponse,
  ListPostsResponse,
  Post,
  SearchPostsResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from '@/features/posts/types'

export async function listPosts(): Promise<{ posts: Post[]; total: number }> {
  const { data } = await apiClient.get<ListPostsResponse>('/posts')
  return {
    posts: data.data.map(mapPostEntity),
    total: data.pagination.total,
  }
}

export async function searchPosts(query: string): Promise<Post[]> {
  const trimmed = query.trim()
  if (!trimmed) {
    const { posts } = await listPosts()
    return posts
  }
  const { data } = await apiClient.get<SearchPostsResponse>('/posts/search', {
    params: { q: trimmed },
  })
  return data.data.map(mapPostEntity)
}

export async function getPostById(id: string): Promise<Post> {
  const { data } = await apiClient.get<GetPostResponse>(`/posts/${id}`)
  return mapPostEntity(data.data)
}

export async function createPost(body: CreatePostRequest): Promise<Post> {
  const { data } = await apiClient.post<CreatePostResponse>('/posts', body)
  return mapPostEntity(data.data)
}

export async function updatePost(id: string, body: UpdatePostRequest): Promise<Post> {
  const { data } = await apiClient.put<UpdatePostResponse>(`/posts/${id}`, body)
  return mapPostEntity(data.data)
}

export async function deletePost(id: string): Promise<void> {
  await apiClient.delete(`/posts/${id}`)
}
