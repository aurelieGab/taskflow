import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../../../test/renderWithProviders'
import { ProjectList } from './ProjectList'
import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
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
    const title = await screen.findByRole('heading', { name: 'TaskFlow 1' })
    expect(title.closest('a')).toHaveAttribute('href', '/projects/1')
  })

  it('filtre les projets selon la recherche', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProjectList />)
    expect(await screen.findByText('TaskFlow 1')).toBeInTheDocument()

    const search = screen.getByRole('searchbox', { name: 'Rechercher un projet' })
    await user.type(search, 'TaskFlow 2')
    expect(screen.getByText('TaskFlow 2')).toBeInTheDocument()
    expect(screen.queryByText('TaskFlow 3')).not.toBeInTheDocument()
  })

  it('trie les projets par nom, en tenant compte des numéros', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProjectList />)
    expect(await screen.findByText('TaskFlow 1')).toBeInTheDocument()

    const select = screen.getByRole('combobox', { name: 'Trier par' })

    await user.selectOptions(select, 'Nom (A → Z)')

    const titles = screen.getAllByRole('heading')

    expect(titles[0]?.textContent).toBe('TaskFlow 1')
    expect(titles[1]?.textContent).toBe('TaskFlow 2')
  })
})
