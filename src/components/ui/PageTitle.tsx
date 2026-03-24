import styled from 'styled-components'

export const PageTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.space.lg};
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
`

export const PageTitleSm = styled.h1`
  margin: 0 0 ${({ theme }) => theme.space.lg};
  font-size: 1.5rem;
`
