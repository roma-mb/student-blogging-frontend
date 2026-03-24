import styled from 'styled-components'

export const Textarea = styled.textarea<{ $block?: boolean }>`
  display: ${({ $block }) => ($block ? 'block' : 'inline-block')};
  width: ${({ $block }) => ($block ? '100%' : 'auto')};
  min-height: 10rem;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  line-height: 1.5;
  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`
