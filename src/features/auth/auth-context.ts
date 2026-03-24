import { createContext } from 'react'
import type { AuthUser } from '@/features/auth/types'

export interface AuthContextValue {
  user: AuthUser | null
  accessToken: string | null
  isAuthenticated: boolean
  isReady: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  authError: string | null
  clearAuthError: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
