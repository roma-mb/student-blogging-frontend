import { AUTH_STORAGE_KEY } from '@/config/constants'

let accessToken: string | null = null

function readTokenFromStorage(): string | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) {
      return null
    }
    const parsed = JSON.parse(raw) as { accessToken?: unknown }
    return typeof parsed.accessToken === 'string' ? parsed.accessToken : null
  } catch {
    return null
  }
}

export function setAccessToken(token: string | null): void {
  accessToken = token
}

export function getAccessToken(): string | null {
  if (accessToken) {
    return accessToken
  }
  return readTokenFromStorage()
}
