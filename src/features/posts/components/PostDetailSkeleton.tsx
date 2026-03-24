import styled from 'styled-components'
import { SkeletonLine } from '@/components/ui/Skeleton'

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.sm};
`

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`

export function PostDetailSkeleton() {
  return (
    <Stack aria-hidden="true">
      <SkeletonLine $width="70%" $height="2rem" $radius="8px" />
      <MetaRow>
        <SkeletonLine $width="12rem" $height="0.9rem" />
        <SkeletonLine $width="10rem" $height="0.9rem" />
      </MetaRow>
      <SkeletonLine $width="100%" $height="0.85rem" />
      <SkeletonLine $width="100%" $height="0.85rem" />
      <SkeletonLine $width="92%" $height="0.85rem" />
      <SkeletonLine $width="88%" $height="0.85rem" />
    </Stack>
  )
}
