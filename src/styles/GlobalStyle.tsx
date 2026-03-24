import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    min-height: 100dvh;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 1rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
  }

  #root {
    min-height: 100dvh;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
    text-decoration: underline;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`
