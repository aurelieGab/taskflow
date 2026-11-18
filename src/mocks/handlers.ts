import { http, HttpResponse } from 'msw/http'
import type { Project } from '../features/projects/types'
import type { CreateProjectInput } from '../features/projects/schema'

const projects: Project[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  name: `TaskFlow ${i + 1}`,
  description: `Description du projet ${i + 1}`,
  createdAt: new Date(2026, 0, i + 1).toISOString(),
}))

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/projects`, () => {
    return HttpResponse.json(projects)
  }),
  http.post(`${import.meta.env.VITE_API_URL}/projects`, async ({ request }) => {
    const body = (await request.json()) as CreateProjectInput

    const newProject: Project = {
      id: crypto.randomUUID(),
      name: body.name,
      description: body.description,
      createdAt: new Date().toISOString(),
    }

    projects.push(newProject)

    return HttpResponse.json(newProject, { status: 201 })
  }),
]
