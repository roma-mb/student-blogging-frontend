import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@/components/ui/Button'
import { ErrorAlertBanner } from '@/components/ui/ErrorAlert'
import { MutedText } from '@/components/ui/MutedText'
import { PageTitleSm } from '@/components/ui/PageTitle'
import * as postsApi from '@/features/posts/api/postsApi'
import { getApiErrorMessage } from '@/lib/axios'

const Lead = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
`

const Toolbar = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  align-items: center;
`

const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    text-decoration: none;
    color: #fff;
  }
`

const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
`

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.space.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
`

const Td = styled.td`
  padding: ${({ theme }) => theme.space.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  vertical-align: middle;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`

const TitleCell = styled.span`
  font-weight: 500;
`

export function AdminDashboardPage() {
  const queryClient = useQueryClient()

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts', 'admin', 'list'],
    queryFn: async () => {
      const { posts } = await postsApi.listPosts()
      return posts
    },
  })

  const { mutate: removePost, isPending: isDeletingPost } = useMutation({
    mutationFn: (postId: string) => postsApi.deletePost(postId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return (
    <>
      <PageTitleSm>Administração</PageTitleSm>
      <Lead>
        Gerencie postagens: criar, editar na rota dedicada ou excluir. A lista é
        revalidada automaticamente após exclusão.
      </Lead>

      <Toolbar>
        <PrimaryLink to="/posts/novo">Nova postagem</PrimaryLink>
      </Toolbar>

      {isPending ? <MutedText>Carregando…</MutedText> : null}

      {isError ? (
        <ErrorAlertBanner role="alert">{getApiErrorMessage(error)}</ErrorAlertBanner>
      ) : null}

      {data && data.length === 0 && !isPending ? (
        <MutedText>Nenhuma postagem cadastrada.</MutedText>
      ) : null}

      {data && data.length > 0 ? (
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <Th>Título</Th>
                <Th>Autor</Th>
                <Th>Ações</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((post) => (
                <tr key={post.id}>
                  <Td>
                    <TitleCell>{post.title}</TitleCell>
                  </Td>
                  <Td>{post.author}</Td>
                  <Td>
                    <Actions>
                      <Link to={`/admin/edit/${post.id}`}>Editar</Link>
                      <Button
                        type="button"
                        $variant="ghost"
                        disabled={isDeletingPost}
                        onClick={() => {
                          if (
                            window.confirm(
                              `Excluir o post "${post.title}"? Esta ação não pode ser desfeita.`,
                            )
                          ) {
                            removePost(post.id)
                          }
                        }}
                      >
                        Excluir
                      </Button>
                    </Actions>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      ) : null}
    </>
  )
}
