import styled from 'styled-components'

export const MutedText = styled.p`
  margin: ${({ theme }) => theme.space.xl} 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const MutedTextInline = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
`
