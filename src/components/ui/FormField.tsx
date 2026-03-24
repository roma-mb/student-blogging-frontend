import type { ReactNode } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`

const Label = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export function FormField({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: ReactNode
}) {
  return (
    <Root>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </Root>
  )
}
