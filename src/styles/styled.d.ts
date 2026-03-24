import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string
      surface: string
      surfaceHover: string
      border: string
      text: string
      textMuted: string
      primary: string
      primaryHover: string
      danger: string
      success: string
    }
    fonts: {
      sans: string
      mono: string
    }
    space: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', string>
    radii: Record<'sm' | 'md' | 'lg' | 'full', string>
    breakpoints: Record<'sm' | 'md' | 'lg', string>
  }
}
