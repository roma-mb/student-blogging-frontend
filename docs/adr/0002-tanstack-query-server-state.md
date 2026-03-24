# ADR 0002: TanStack Query (React Query) para estado de servidor

## Status

Aceito.

## Contexto

A aplicação depende fortemente de dados remotos (lista de posts, detalhe, mutações de CRUD, autenticação via API). Sem uma camada dedicada, o mesmo estado tende a ser espalhado em `useEffect`, estados locais duplicados e caches inconsistentes após criar/editar/excluir.

Redux ou Contexto global para **todas** as respostas HTTP adicionaria boilerplate para loading, erro, deduplicação e invalidação.

## Decisão

Usar **TanStack Query** como camada de **estado de servidor**:

- `useQuery` para leituras (lista, busca com debounce, detalhe do post) com cache por `queryKey`, estados `isPending` / `isFetching` / `isError`.
- `useMutation` para escrita (criar, atualizar, excluir) com `invalidateQueries` para revalidar listas após sucesso.
- Manter **Context API apenas para autenticação** (sessão, token, login/logout), não para substituir o cache de dados da API.

Axios permanece como cliente HTTP único (`src/lib/axios.ts`), com interceptor que injeta o JWT.

## Consequências

**Positivas**

- Menos código manual para loading/erro e para “atualizar a lista depois do delete”.
- Cache e deduplicação nativos; busca debounced beneficia-se de chaves estáveis.
- Separação clara: servidor (Query) vs sessão do usuário (Auth).

**Negativas / trade-offs**

- Curva de aprendizado em `queryKey`, invalidação e `enabled` em queries dependentes de parâmetros.
- Variáveis de ambiente do Vite (`VITE_*`) continuam resolvidas em **build time**; trocar API em runtime exige novo build ou configuração de proxy (fora do escopo do ADR).
