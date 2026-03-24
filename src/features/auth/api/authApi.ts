import { apiClient } from '@/lib/axios'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/features/auth/types'

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', body)
  return data
}

export async function register(body: RegisterRequest): Promise<RegisterResponse> {
  const { data } = await apiClient.post<RegisterResponse>('/auth/register', body)
  return data
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout')
}
