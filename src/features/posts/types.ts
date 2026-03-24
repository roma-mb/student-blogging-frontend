export interface PostEntityApi {
  _id: { value: string }
  _title: string
  _content: string
  _author: string
  _createdAt: string
  _updatedAt: string
}

export interface PaginationApi {
  limit: number
  skip: number
  total: number
  hasMore: boolean
}

export interface ListPostsResponse {
  success: true
  data: PostEntityApi[]
  pagination: PaginationApi
}

export interface SearchPostsResponse {
  success: true
  data: PostEntityApi[]
}

export interface GetPostResponse {
  success: true
  data: PostEntityApi
}

export interface CreatePostRequest {
  title: string
  content: string
  author: string
}

export interface CreatePostResponse {
  success: true
  message: string
  data: PostEntityApi
}

export interface UpdatePostRequest {
  title: string
  content: string
}

export interface UpdatePostResponse {
  success: true
  message: string
  data: PostEntityApi
}

export interface Post {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}
