import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.55;
  }
`

export const SkeletonLine = styled.div<{
  $width?: string
  $height?: string
  $radius?: string
}>`
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height ?? '1rem'};
  border-radius: ${({ theme, $radius }) => $radius ?? theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceHover};
  animation: ${shimmer} 1.25s ease-in-out infinite;
`
