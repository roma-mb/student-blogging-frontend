import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import styled from 'styled-components'
import { ErrorAlertBanner } from '@/components/ui/ErrorAlert'
import { Input } from '@/components/ui/Input'
import { MutedText } from '@/components/ui/MutedText'
import { PageTitle } from '@/components/ui/PageTitle'
import * as postsApi from '@/features/posts/api/postsApi'
import { PostList } from '@/features/posts/components/PostList'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { getApiErrorMessage } from '@/lib/axios'

const SEARCH_DEBOUNCE_MS = 400

const SearchLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.space.sm};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const SearchStatus = styled.p`
  margin: ${({ theme }) => `${theme.space.sm} 0 0`};
  min-height: 1.25rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export function HomePage() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS)

  const {
    data: posts,
    isPending,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts', debouncedSearch],
    queryFn: () => postsApi.searchPosts(debouncedSearch),
  })

  const showSearchPending = search !== debouncedSearch || (isFetching && !isPending)

  return (
    <>
      <PageTitle>Posts</PageTitle>
      <div>
        <SearchLabel htmlFor="post-search">Buscar por palavras-chave</SearchLabel>
        <Input
          id="post-search"
          type="search"
          name="q"
          placeholder="Ex.: blog, prova, dúvidas…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
          $block
        />
        <SearchStatus aria-live="polite">
          {showSearchPending ? 'Buscando…' : '\u00a0'}
        </SearchStatus>
      </div>

      {isPending ? <MutedText>Carregando posts…</MutedText> : null}

      {isError ? (
        <ErrorAlertBanner role="alert">{getApiErrorMessage(error)}</ErrorAlertBanner>
      ) : null}

      {posts && posts.length === 0 && !isPending ? (
        <MutedText>Nenhum post encontrado.</MutedText>
      ) : null}

      {posts && posts.length > 0 ? <PostList posts={posts} /> : null}
    </>
  )
}
