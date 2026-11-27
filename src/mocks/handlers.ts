import { http, HttpResponse } from 'msw/http'
import type { Project } from '@/features/projects/types'
import type { CreateProjectInput } from '@/features/projects/schema'
import type { User } from '@/features/auth/types'
import type { Task } from '@/features/tasks/types'
import type { LoginInput } from '@/features/auth/schema'
import type { CreateTaskInput } from '@/features/tasks/schema'

const API = import.meta.env.VITE_API_URL

const SESSION_KEY = 'user'

const saveSession = (user: User) => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

const loadSession = () => {
  const saved = sessionStorage.getItem(SESSION_KEY)
  if (!saved) return null
  return JSON.parse(saved) as User
}

const removeSession = () => {
  sessionStorage.removeItem(SESSION_KEY)
}

const projects: Project[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  name: `TaskFlow ${i + 1}`,
  description: `Description du projet ${i + 1}`,
  createdAt: new Date(2026, 0, i + 1).toISOString(),
}))

const initialTasks: Task[] = [
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

let tasks: Task[] = [...initialTasks]

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

  http.post<never, CreateProjectInput>(`${API}/projects`, async ({ request }) => {
    const body = await request.json()

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
  http.post<never, LoginInput>(`${API}/login`, async ({ request }) => {
    const { email, password } = await request.json()

    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) return HttpResponse.json({ message: 'Identifiants invalides' }, { status: 401 })

    const sessionUser: User = { id: user.id, name: user.name, email: user.email }

    saveSession(sessionUser)

    return HttpResponse.json(sessionUser)
  }),

  //GET /me: who is connected ?
  http.get(`${API}/me`, () => {
    const user = loadSession()
    if (!user) return HttpResponse.json(null, { status: 401 })

    return HttpResponse.json(user)
  }),

  // POST /logout : forget user
  http.post(`${API}/logout`, () => {
    removeSession()
    return new HttpResponse(null, { status: 204 })
  }),

  // Tasks -------------------------------------------------------------
  http.get(`${API}/projects/:projectId/tasks`, ({ params }) => {
    const isExistingProject = projects.some((project) => project.id === params.projectId)

    if (!isExistingProject)
      return HttpResponse.json({ message: "Le projet n'existe pas" }, { status: 404 })

    const projectTasks = tasks.filter((task) => task.projectId === params.projectId)

    return HttpResponse.json(projectTasks)
  }),

  http.post<{ projectId: string }, CreateTaskInput>(
    `${API}/projects/:projectId/tasks`,
    async ({ request, params }) => {
      const body = await request.json()

      const isExistingProject = projects.some((project) => project.id === params.projectId)

      if (!isExistingProject) {
        return HttpResponse.json({ message: "Ce projet n'existe pas" }, { status: 404 })
      }

      const newTask: Task = {
        id: crypto.randomUUID(),
        projectId: params.projectId,
        title: body.title,
        done: false,
        createdAt: new Date().toISOString(),
      }

      tasks.push(newTask)

      return HttpResponse.json(newTask, { status: 201 })
    },
  ),
]

export function resetSession() {
  removeSession()
}

export function resetTasks() {
  tasks = [...initialTasks]
}
