import styled from 'styled-components'

const Text = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.danger};
`

export function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) {
    return null
  }
  return (
    <Text role="alert" id={id}>
      {message}
    </Text>
  )
}
