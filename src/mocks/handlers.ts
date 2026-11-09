import { http, HttpResponse } from 'msw/http'
import type { Project } from '../features/projects/types'

const projects: Project[] = [
  { id: '1', name: 'TaskFlow 1', description: 'Mon projet 1', createdAt: '2026-11-07' },
  { id: '2', name: 'TaskFlow 2', description: 'Mon projet 2', createdAt: '2026-11-08' },
  { id: '3', name: 'TaskFlow 3', description: 'Mon projet 3', createdAt: '2026-11-09' },
]

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/projects`, () => {
    return HttpResponse.json(projects)
  }),
]
