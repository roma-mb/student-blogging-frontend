import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { AdminDashboardPage } from '@/features/admin/pages/AdminDashboardPage'
import { CreatePostPage } from '@/features/admin/pages/CreatePostPage'
import { EditPostPage } from '@/features/admin/pages/EditPostPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { HomePage } from '@/features/posts/pages/HomePage'
import { PostPage } from '@/features/posts/pages/PostPage'
import { NotFoundPage } from '@/routes/NotFoundPage'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      {
        path: 'posts/novo',
        element: (
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/edit/:id',
        element: (
          <ProtectedRoute>
            <EditPostPage />
          </ProtectedRoute>
        ),
      },
      { path: 'posts/:postId', element: <PostPage /> },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
