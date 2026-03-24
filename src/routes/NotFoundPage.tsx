import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.space.md};
  font-size: 1.35rem;
`

const Text = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.lg};
  color: ${({ theme }) => theme.colors.textMuted};
`

export function NotFoundPage() {
  return (
    <>
      <Title>Página não encontrada</Title>
      <Text>O endereço não existe ou foi movido.</Text>
      <Link to="/">Voltar à lista de posts</Link>
    </>
  )
}
