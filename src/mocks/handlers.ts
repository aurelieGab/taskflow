import { http, HttpResponse } from 'msw/http'
import type { Project } from '@/features/projects/types'
import type { CreateProjectInput } from '@/features/projects/schema'
import type { User } from '@/features/auth/types'
import type { Task } from '@/features/tasks/types'

const API = import.meta.env.VITE_API_URL

const projects: Project[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  name: `TaskFlow ${i + 1}`,
  description: `Description du projet ${i + 1}`,
  createdAt: new Date(2026, 0, i + 1).toISOString(),
}))

const tasks: Task[] = [
  {
    id: '1',
    projectId: '25',
    title: 'Créer la maquette',
    done: true,
    createdAt: '2026-11-03T09:00:00.000Z',
  },
  {
    id: '2',
    projectId: '25',
    title: 'Écrire les tests',
    done: false,
    createdAt: '2026-11-05T14:30:00.000Z',
  },
  {
    id: '3',
    projectId: '24',
    title: 'Configurer le router',
    done: false,
    createdAt: '2026-11-10T08:15:00.000Z',
  },
  {
    id: '4',
    projectId: '23',
    title: 'Créer le composant',
    done: false,
    createdAt: '2026-11-12T16:45:00.000Z',
  },
  {
    id: '5',
    projectId: '22',
    title: 'Appeler API',
    done: false,
    createdAt: '2026-11-18T11:00:00.000Z',
  },
]

// let currentUser: User | null = null
let currentUser: User | null = { id: '1', email: 'aurelie@taskflow.dev', name: 'Aurélie' }

const users = [
  {
    id: '1',
    email: 'aurelie@taskflow.dev',
    password: 'motdepasse',
    name: 'Aurélie',
  },
]

export const handlers = [
  http.get(`${API}/projects`, () => {
    return HttpResponse.json(projects)
  }),

  http.post(`${API}/projects`, async ({ request }) => {
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

  // POST /login check email and password
  http.post(`${API}/login`, async ({ request }) => {
    const { email, password } = (await request.json()) as { email: string; password: string }

    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) return HttpResponse.json({ message: 'Identifiants invalides' }, { status: 401 })

    currentUser = { id: user.id, name: user.name, email: user.email }
    return HttpResponse.json(currentUser)
  }),

  //GET /me: who is connected ?
  http.get(`${API}/me`, () => {
    if (!currentUser) return HttpResponse.json(null, { status: 401 })
    return HttpResponse.json(currentUser)
  }),

  // POST /logout : forget user
  http.post(`${API}/logout`, () => {
    currentUser = null
    return new HttpResponse(null, { status: 204 })
  }),

  http.get(`${API}/projects/:projectId/tasks`, ({ params }) => {
    const isExistingProject = projects.some((project) => project.id === params.projectId)
    if (!isExistingProject)
      return HttpResponse.json({ message: "Le projet n'existe pas" }, { status: 404 })

    const projectTasks = tasks.filter((task) => task.projectId === params.projectId)
    return HttpResponse.json(projectTasks)
  }),
]

export function resetSession() {
  currentUser = null
}
