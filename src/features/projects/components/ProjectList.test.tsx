import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { ProjectList } from './ProjectList'
import { screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw/http'
import { server } from '../../../mocks/node'

describe('ProjectList', () => {
  it('affiche les noms des projets', async () => {
    renderWithProviders(<ProjectList />)
    expect(await screen.findByText('TaskFlow 1')).toBeInTheDocument()
  })

  it('affiche un message quand le chargement échoue', async () => {
    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/projects`, () => {
        return new HttpResponse(null, { status: 500 })
      }),
    )

    renderWithProviders(<ProjectList />)
    expect(await screen.findByRole('alert')).toHaveTextContent('Impossible de charger les projets')
  })

  it("affiche un message quand il n'y a aucun projet", async () => {
    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/projects`, () => {
        return HttpResponse.json([])
      }),
    )

    renderWithProviders(<ProjectList />)
    expect(await screen.findByText('Aucun projet pour l’instant')).toBeInTheDocument()
  })

  it('chaque projet mène vers la page avec son id correspondant', async () => {
    renderWithProviders(<ProjectList />)
    expect(await screen.findByRole('link', { name: 'TaskFlow 1' })).toHaveAttribute(
      'href',
      '/projects/1',
    )
  })
})
