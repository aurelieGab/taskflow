import { createBrowserRouter, Navigate } from 'react-router'
import { ProjectsPage } from '../routes/ProjectsPage'
import { ProjectDetailPage } from '../routes/ProjectDetailPage'
import { NotFoundPage } from '../routes/NotFoundPage'
import { Layout } from './Layout'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        element: <Navigate to="projects" replace />,
      },
      {
        path: 'projects',
        Component: ProjectsPage,
      },
      {
        path: 'projects/:projectId',
        Component: ProjectDetailPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
])
