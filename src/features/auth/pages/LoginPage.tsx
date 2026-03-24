import { useState, type FormEvent } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@/components/ui/Button'
import { ErrorAlert } from '@/components/ui/ErrorAlert'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { PageTitleSm } from '@/components/ui/PageTitle'
import { useAuth } from '@/features/auth/useAuth'

const Form = styled.form`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`

const SubmitRow = styled.div`
  margin-top: ${({ theme }) => theme.space.sm};
`

const Lead = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.textMuted};
`

export function LoginPage() {
  const { login, isAuthenticated, isReady, authError, clearAuthError } = useAuth()
  const location = useLocation()
  const stateFrom = (location.state as { from?: string } | undefined)?.from
  const from = stateFrom && stateFrom !== '/login' ? stateFrom : '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (isReady && isAuthenticated) {
    return <Navigate to={from} replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    clearAuthError()
    setSubmitting(true)
    try {
      await login(email, password)
    } catch {
      console.error('Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageTitleSm>Entrar</PageTitleSm>
      <Lead>
        Acesso para docentes. Criação, edição e administração de posts exigem login.
      </Lead>
      <Form onSubmit={onSubmit} noValidate>
        {authError ? <ErrorAlert role="alert">{authError}</ErrorAlert> : null}
        <FormField id="login-email" label="E-mail">
          <Input
            id="login-email"
            name="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </FormField>
        <FormField id="login-password" label="Senha">
          <Input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </FormField>
        <SubmitRow>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Entrando…' : 'Entrar'}
          </Button>
        </SubmitRow>
      </Form>
    </>
  )
}
