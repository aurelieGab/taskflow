import { createBrowserRouter, Navigate } from 'react-router'
import { ProjectsPage } from '../routes/ProjectsPage'
import { ProjectDetailPage } from '../routes/ProjectDetailPage'
import { NotFoundPage } from '../routes/NotFoundPage'
import { Layout } from './Layout'
import { ProtectedRoute } from './ProtectedRoute'
import { LoginPage } from '../routes/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Navigate to="projects" replace />,
          },
          {
            path: 'projects',
            element: <ProjectsPage />,
          },
          {
            path: 'projects/:projectId',
            element: <ProjectDetailPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
