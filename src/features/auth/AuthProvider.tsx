import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AUTH_STORAGE_KEY } from '@/config/constants'
import * as authApi from '@/features/auth/api/authApi'
import { AuthContext } from '@/features/auth/auth-context'
import type { AuthUser } from '@/features/auth/types'
import { getApiErrorMessage } from '@/lib/axios'
import { setAccessToken } from '@/lib/auth-token'

interface PersistedAuth {
  accessToken: string
  user: AuthUser
}

function readStoredAuth(): PersistedAuth | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) {
      return null
    }
    const parsed = JSON.parse(raw) as PersistedAuth
    if (
      parsed &&
      typeof parsed.accessToken === 'string' &&
      parsed.user &&
      typeof parsed.user.id === 'string'
    ) {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

function writeStoredAuth(value: PersistedAuth | null): void {
  if (!value) {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(value))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [accessToken, setToken] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const stored = readStoredAuth()
    if (stored) {
      setAccessToken(stored.accessToken)
      setToken(stored.accessToken)
      setUser(stored.user)
    } else {
      setAccessToken(null)
    }
    setIsReady(true)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setAuthError(null)
    try {
      const res = await authApi.login({ email, password })
      setAccessToken(res.accessToken)
      setToken(res.accessToken)
      setUser(res.user)
      writeStoredAuth({ accessToken: res.accessToken, user: res.user })
    } catch (e) {
      setAuthError(getApiErrorMessage(e))
      throw e
    }
  }, [])

  const logout = useCallback(async () => {
    setAuthError(null)
    try {
      if (accessToken) {
        await authApi.logout()
      }
    } catch {
      console.error('Logout failed, clearing local auth state anyway')
    } finally {
      setAccessToken(null)
      setToken(null)
      setUser(null)
      writeStoredAuth(null)
    }
  }, [accessToken])

  const clearAuthError = useCallback(() => setAuthError(null), [])

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(accessToken && user),
      isReady,
      login,
      logout,
      authError,
      clearAuthError,
    }),
    [user, accessToken, isReady, login, logout, authError, clearAuthError],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
