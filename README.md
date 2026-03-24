# Student Blogging — Front-end

Interface web em **React** para o Tech Challenge: listagem e leitura públicas de posts, autenticação de docentes e área administrativa (criar, editar, excluir), integrada à API REST documentada em `[postman.json](./postman.json)`.

## Pré-requisitos

| Ambiente              | Versão / notas                                               |
| --------------------- | ------------------------------------------------------------ |
| **Node.js**           | `>= 20.19` (recomendado **22.x** — ver `[.nvmrc](./.nvmrc)`) |
| **npm**               | Incluído com Node                                            |
| **Docker** (opcional) | Apenas para build/imagem de produção com Nginx               |

## Instalação e scripts (Node)

```bash
git clone <url-do-repositório>
cd student-blogging-frontend
cp .env.example .env          # ajuste VITE_API_BASE_URL se necessário
npm ci
```

| Script                 | Descrição                                           |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento (Vite)                  |
| `npm run build`        | Checagem TypeScript (`tsc -b`) + build de produção  |
| `npm run typecheck`    | Apenas verificação de tipos (`tsc -b`)              |
| `npm run build:vite`   | Somente `vite build` (usado na CI após `typecheck`) |
| `npm run lint`         | ESLint                                              |
| `npm run format`       | Prettier (gravar)                                   |
| `npm run format:check` | Prettier (somente verificar)                        |
| `npm run preview`      | Pré-visualizar o `dist` localmente                  |

### Variáveis de ambiente

Crie um arquivo `.env` a partir de `[.env.example](./.env.example)`:

- `**VITE_API_BASE_URL**` — URL base da API **sem** barra final (ex.: `https://api.example.com`). No Vite, variáveis `VITE_`\* são embutidas no bundle no **momento do build**.

## Docker (local e produção)

O projeto possui dois fluxos:

1. **Local** com Vite em modo desenvolvimento (`Dockerfile.dev` + `compose.dev.yml`).
2. **Produção** com build estático e Nginx sem privilégios (`Dockerfile` + `compose.yml`).

### Ambiente local (hot reload)

```bash
docker compose -f compose.dev.yml up --build
```

A aplicação fica disponível em `http://localhost:5173`.

### Ambiente de produção

```bash
docker compose -f compose.yml up --build -d
```

A aplicação fica disponível em `http://localhost:8080`.

### Segurança aplicada no Dockerfile de produção

1. Runtime com imagem `nginxinc/nginx-unprivileged` (sem root).
2. Porta não privilegiada (`8080`) e endpoint `/health` para observabilidade.
3. Header hardening básico no Nginx (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).
4. Flags do `npm ci` para reduzir ruído e superfície durante build (`--ignore-scripts --no-audit --no-fund`).

## Arquitetura da aplicação

- **Features** (`src/features/`): domínios _auth_, _posts_ (público) e _admin_ (gestão), cada um com páginas, validação e chamadas à API quando aplicável.
- **Componentes genéricos** (`src/components/`): UI reutilizável (formulário, layout, skeletons).
- **Lib** (`src/lib/`): cliente Axios (JWT no header), factory do Query Client, token com fallback em `localStorage`.
- **Rotas** (`src/routes/`): `createBrowserRouter` e `<ProtectedRoute>`.
- **Estilos** (`src/styles/`): tema Styled Components e `GlobalStyle`.

Decisões registradas em **ADRs**: [docs/adr/README.md](./docs/adr/README.md).

### Estado de servidor vs autenticação

- **TanStack Query**: cache, loading, erros e revalidação após mutações (`invalidateQueries`).
- **Context API**: somente sessão (login/logout, token persistido).

Detalhes: [ADR 0001 — features](./docs/adr/0001-feature-based-architecture.md), [ADR 0002 — React Query](./docs/adr/0002-tanstack-query-server-state.md).

## CI/CD (GitHub Actions)

O workflow `[.github/workflows/ci.yml](./.github/workflows/ci.yml)` roda em **push** e **pull request** para `main` ou `master`:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build:vite` (com `VITE_API_BASE_URL` definida para o job)
5. validação dos arquivos de compose (`docker compose config -q`)
6. build das imagens de produção (`Dockerfile`)

Isso valida estilo, tipos e integridade dos artefatos Docker antes de integrar na branch principal.

## Contrato da API

A coleção Postman na raiz do repositório descreve os endpoints (`/auth/`\*, `/posts`, etc.).

## Licença

Conforme o arquivo `LICENSE` do repositório.
