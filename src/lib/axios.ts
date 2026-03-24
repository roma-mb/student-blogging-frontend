import axios, { type AxiosError } from 'axios'
import { getApiBaseUrl } from '@/config/env'
import { getAccessToken } from '@/lib/auth-token'

export interface ApiErrorBody {
  error: {
    message: string
    statusCode: number
    code: string
  }
}

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function getApiErrorMessage(error: unknown): string {
  const ax = error as AxiosError<ApiErrorBody>
  const msg = ax.response?.data?.error?.message
  if (typeof msg === 'string' && msg.length > 0) {
    return msg
  }
  if (ax.message) {
    return ax.message
  }
  return 'Ocorreu um erro inesperado.'
}
