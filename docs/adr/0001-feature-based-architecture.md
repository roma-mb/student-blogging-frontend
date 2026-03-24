# ADR 0001: Estrutura orientada a features (feature-based)

## Status

Aceito.

## Contexto

O projeto integra múltiplos fluxos de negócio (autenticação, leitura pública de posts, administração) sobre uma única SPA React. Era necessário um arranjo de pastas que:

- reduza acoplamento entre domínios;
- facilite localizar código por capacidade (auth, posts, admin);
- escale com novas telas e APIs sem um “Deus” em `src/pages` ou `src/components`.

## Decisão

Adotar uma **arquitetura orientada a features** sob `src/features/`, onde cada módulo agrupa o que é específico daquele domínio (páginas, validação, chamadas à API quando faz sentido), mantendo em `src/components/` apenas UI **genérica** (botões, inputs, layout), em `src/lib/` a configuração de bibliotecas (Axios, React Query factory), em `src/routes/` o roteamento e guards, e em `src/styles/` o tema global.

## Consequências

**Positivas**

- Imports e responsabilidades ficam previsíveis (`features/admin` vs `features/posts`).
- Novos membros encontram código pelo domínio, não só pelo tipo de arquivo.
- Testes e refactors podem focar em um feature isoladamente.

**Negativas / trade-offs**

- Alguns imports cruzam features (ex.: admin consome `postsApi`); exige disciplina para não inverter dependências (features não devem depender uns dos outros de forma circular).
- É preciso documentar a convenção (README + ADRs) para alinhar a equipe.
