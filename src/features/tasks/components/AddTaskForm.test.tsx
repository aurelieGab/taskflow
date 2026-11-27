import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import { AddTaskForm } from '@/features/tasks/components/AddTaskForm'
import userEvent from '@testing-library/user-event'
import { TaskList } from '@/features/tasks/components/TaskList'
import { server } from '@/mocks/node'
import { http, HttpResponse } from 'msw/http'

describe('AddTaskForm', () => {
  it('affiche la tâche créée dans la liste des tâches', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <>
        <AddTaskForm projectId="25" />
        <TaskList projectId="25" />
      </>,
    )

    const titleInput = screen.getByLabelText('Ajouter une tâche')
    await user.type(titleInput, 'Créer un composant')
    await user.click(screen.getByRole('button', { name: 'Créer' }))

    await waitFor(() => expect(titleInput).toHaveValue(''))
    expect(await screen.findByText('Créer un composant')).toBeInTheDocument()
  })

  it("affiche un message d'erreur lorsque le titre est vide", async () => {
    const user = userEvent.setup()

    const createTaskRequest = vi.fn()

    server.use(
      http.post(`${import.meta.env.VITE_API_URL}/projects/25/tasks`, () => {
        createTaskRequest()
        return HttpResponse.json({}, { status: 201 })
      }),
    )

    renderWithProviders(<AddTaskForm projectId="25" />)
    const titleInput = screen.getByLabelText('Ajouter une tâche')
    await user.click(screen.getByRole('button', { name: 'Créer' }))

    await waitFor(() => expect(titleInput).toHaveAccessibleDescription('Le titre est obligatoire'))
    expect(createTaskRequest).not.toHaveBeenCalled()
  })

  it("affiche le message 'Impossible d'ajouter la tâche' lorsque l'API renvoie une 500", async () => {
    const user = userEvent.setup()
    renderWithProviders(<AddTaskForm projectId="25" />)

    server.use(
      http.post(`${import.meta.env.VITE_API_URL}/projects/25/tasks`, () => {
        return new HttpResponse(null, { status: 500 })
      }),
    )

    const titleInput = screen.getByLabelText('Ajouter une tâche')
    await user.type(titleInput, 'Créer un composant')
    await user.click(screen.getByRole('button', { name: 'Créer' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      "Impossible d'ajouter la tâche. Réessayez.",
    )
  })
})
