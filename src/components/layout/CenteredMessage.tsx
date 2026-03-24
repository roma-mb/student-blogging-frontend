import type { ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  padding: ${({ theme }) => theme.space.lg};
  color: ${({ theme }) => theme.colors.textMuted};
`

export function CenteredMessage({ children }: { children: ReactNode }) {
  return <Wrapper role="status">{children}</Wrapper>
}
