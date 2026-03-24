import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { CenteredMessage } from '@/components/layout/CenteredMessage'
import { useAuth } from '@/features/auth/useAuth'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isReady } = useAuth()
  const location = useLocation()

  if (!isReady) {
    return <CenteredMessage>Carregando…</CenteredMessage>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}
