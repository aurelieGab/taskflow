import { describe, it, expect } from 'vitest'
import { renderWithQueryClient } from '../../../test/renderWithQueryClient'
import { ProjectList } from './ProjectList'
import { screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw/http'
import { server } from '../../../mocks/node'

describe('ProjectList', () => {
  it('affiche les noms des projets', async () => {
    renderWithQueryClient(<ProjectList />)
    expect(await screen.findByText('TaskFlow 1')).toBeInTheDocument()
  })

  it('affiche un message quand le chargement échoue', async () => {
    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/projects`, () => {
        return new HttpResponse(null, { status: 500 })
      }),
    )

    renderWithQueryClient(<ProjectList />)
    expect(await screen.findByRole('alert')).toHaveTextContent('Impossible de charger les projets')
  })

  it("affiche un message quand il n'y a aucun projet", async () => {
    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/projects`, () => {
        return HttpResponse.json([])
      }),
    )

    renderWithQueryClient(<ProjectList />)
    expect(await screen.findByText('Aucun projet pour l’instant')).toBeInTheDocument()
  })
})
