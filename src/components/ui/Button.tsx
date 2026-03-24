import styled, { css } from 'styled-components'

type Variant = 'primary' | 'ghost'

const variantStyles = {
  primary: css`
    padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
    border: none;
    border-radius: ${({ theme }) => theme.radii.md};
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    font-weight: 600;
    cursor: pointer;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `,
  ghost: css`
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    text-decoration: underline;
  `,
}

export const Button = styled.button<{ $variant?: Variant }>`
  font: inherit;

  ${({ $variant = 'primary' }) => variantStyles[$variant]}
`
