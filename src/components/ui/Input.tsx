import styled from 'styled-components'

export const Input = styled.input<{ $block?: boolean; $wide?: boolean }>`
  display: ${({ $block }) => ($block ? 'block' : 'inline-block')};
  width: ${({ $block }) => ($block ? '100%' : 'auto')};
  max-width: ${({ $block, $wide }) => (!$block ? 'none' : $wide ? '100%' : '420px')};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`
