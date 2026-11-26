import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { server } from '@/mocks/node'
import { http, HttpResponse } from 'msw/http'
import type { Task } from '@/features/tasks/types'
import { TaskList } from '@/features/tasks/components/TaskList'
import { renderWithProviders } from '@/test/renderWithProviders'

describe('TaskList', () => {
  it("affiche les tâches de l'id demandé", async () => {
    const projectId = '25'
    const testTask: Task[] = [
      {
        id: '1',
        projectId,
        title: 'Créer la maquette',
        done: true,
        createdAt: '2026-11-03T09:00:00.000Z',
      },
      {
        id: '2',
        projectId,
        title: 'Écrire les tests',
        done: false,
        createdAt: '2026-11-06T09:00:00.000Z',
      },
    ]
    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`, () => {
        return HttpResponse.json(testTask)
      }),
    )

    renderWithProviders(<TaskList projectId={projectId} />)

    expect(await screen.findByText('Créer la maquette')).toHaveTextContent('Terminée')
    expect(await screen.findByText('Écrire les tests')).toHaveTextContent('À faire')
  })

  it("affiche le message 'Impossible de charger les tâches' si l'API rencontre une erreur", async () => {
    const projectId = '14'
    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`, () => {
        return new HttpResponse(null, { status: 500 })
      }),
    )

    renderWithProviders(<TaskList projectId={projectId} />)

    expect(await screen.findByText('Impossible de charger les tâches')).toBeInTheDocument()
  })

  it("affiche le message 'Ce projet n'existe pas' si 404", async () => {
    const projectId = '202'
    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`, () => {
        return new HttpResponse(null, { status: 404 })
      }),
    )

    renderWithProviders(<TaskList projectId={projectId} />)

    expect(await screen.findByText("Ce projet n'existe pas")).toBeInTheDocument()
  })

  it("affiche le message 'Aucune tâche pour ce projet' si le projet n'a aucune tâche", async () => {
    const projectId = '14'
    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`, () => {
        return HttpResponse.json([])
      }),
    )

    renderWithProviders(<TaskList projectId={projectId} />)

    expect(await screen.findByText('Aucune tâche pour ce projet')).toBeInTheDocument()
  })
})
