import styled from 'styled-components'

export const ErrorAlert = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.9rem;
`

export const ErrorAlertBanner = styled(ErrorAlert)`
  margin: ${({ theme }) => theme.space.lg} 0 0;
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.danger} 12%,
    transparent
  );
`
