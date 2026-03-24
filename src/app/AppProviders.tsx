import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { createQueryClient } from '@/lib/react-query'
import { router } from '@/routes/router'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { theme } from '@/styles/theme'

const queryClient = createQueryClient()

export function AppProviders() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
