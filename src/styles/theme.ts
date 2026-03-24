import type { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    background: '#0f1419',
    surface: '#1a2332',
    surfaceHover: '#243044',
    border: '#2d3a4d',
    text: '#e7ecf3',
    textMuted: '#9aa8bc',
    primary: '#3d8bfd',
    primaryHover: '#5c9dff',
    danger: '#f87171',
    success: '#4ade80',
  },
  fonts: {
    sans: '"DM Sans", system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    full: '9999px',
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
  },
}
