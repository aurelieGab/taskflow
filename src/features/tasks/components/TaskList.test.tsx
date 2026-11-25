import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { TaskList } from './TaskList'
import { renderWithProviders } from '@/test/renderWithProviders'
import type { Task } from '../types'
import { server } from '@/mocks/node'
import { http, HttpResponse } from 'msw/http'

describe('TaskList', () => {
  it('affiche les tâches du projet', async () => {
    const projectId = '25'

    const testTasks: Task[] = [
      {
        id: '1',
        projectId,
        title: 'Task test',
        createdAt: '2026-01-01T00:00:00.000Z',
        done: false,
      },
      {
        id: '2',
        projectId,
        title: 'Task test 2',
        createdAt: '2026-01-01T00:00:00.000Z',
        done: true,
      },
    ]

    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`, () =>
        HttpResponse.json(testTasks),
      ),
    )
    renderWithProviders(<TaskList projectId={projectId} />)

    expect(await screen.findByText('Task test')).toBeInTheDocument()
    expect(await screen.findByText('Task test')).toHaveTextContent('À faire')
    expect(await screen.findByText('Task test 2')).toHaveTextContent('Terminée')
  })

  it("affiche Aucune tâche quand le projet n'en a pas", async () => {
    const projectId = '15'

    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`, () =>
        HttpResponse.json([]),
      ),
    )
    renderWithProviders(<TaskList projectId={projectId} />)

    expect(await screen.findByText('Aucune tâche')).toBeInTheDocument()
  })

  it("une 404 affiche « Ce projet n'existe pas »", async () => {
    const projectId = '450'

    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`, () =>
        HttpResponse.json({ message: "Le projet n'existe pas" }, { status: 404 }),
      ),
    )
    renderWithProviders(<TaskList projectId={projectId} />)

    expect(await screen.findByRole('alert')).toHaveTextContent("Ce projet n'existe pas")
  })

  it('une 500 affiche « Impossible de charger les tâches »', async () => {
    const projectId = '450'

    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`, () =>
        HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
      ),
    )
    renderWithProviders(<TaskList projectId={projectId} />)

    expect(await screen.findByRole('alert')).toHaveTextContent('Impossible de charger les tâches')
  })
})
