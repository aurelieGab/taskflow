import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '@/test/renderWithProviders'
import { ProjectList } from './ProjectList'
import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { http, HttpResponse } from 'msw/http'
import { server } from '@/mocks/node'
import type { Project } from '../types'

describe('ProjectList', () => {
  it('affiche les noms des projets', async () => {
    renderWithProviders(<ProjectList />)
    expect(await screen.findByText('TaskFlow 25')).toBeInTheDocument()
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
    const testProjects: Project[] = [
      {
        id: '42',
        name: 'Projet test',
        description: 'Une description',
        createdAt: '2026-01-01T00:00:00.000Z',
      },
    ]

    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/projects`, () => HttpResponse.json(testProjects)),
    )

    renderWithProviders(<ProjectList />)
    const title = await screen.findByRole('heading', { name: 'Projet test' })
    expect(title.closest('a')).toHaveAttribute('href', '/projects/42')
  })

  it('filtre les projets selon la recherche', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProjectList />)
    expect(await screen.findByText('TaskFlow 25')).toBeInTheDocument()

    const search = screen.getByRole('searchbox', { name: 'Rechercher un projet' })
    await user.type(search, 'TaskFlow 24')
    expect(screen.getByText('TaskFlow 24')).toBeInTheDocument()
    expect(screen.queryByText('TaskFlow 23')).not.toBeInTheDocument()
  })

  it('trie les projets par nom, en tenant compte des numéros', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProjectList />)
    expect(await screen.findByText('TaskFlow 25')).toBeInTheDocument()

    const select = screen.getByRole('combobox', { name: 'Trier par' })

    await user.selectOptions(select, 'Nom (A → Z)')

    const titles = screen.getAllByRole('heading')

    expect(titles[0]?.textContent).toBe('TaskFlow 1')
    expect(titles[1]?.textContent).toBe('TaskFlow 2')
  })
  it('affiche 6 projets par page et passe à la page suivante', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProjectList />)
    expect(await screen.findByText('TaskFlow 25')).toBeInTheDocument()

    const projectTitles = screen.getAllByRole('heading')
    expect(projectTitles).toHaveLength(6)

    const btnNext = screen.getByRole('button', { name: 'Suivant' })
    await user.click(btnNext)
    expect(await screen.findByText('Page 2 sur 5')).toBeInTheDocument()
    expect(await screen.findByText('TaskFlow 19')).toBeInTheDocument()
    expect(screen.queryByText('TaskFlow 25')).not.toBeInTheDocument()
  })
  it('revient à la page 1 quand on lance une recherche', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProjectList />)
    expect(await screen.findByText('TaskFlow 25')).toBeInTheDocument()

    const btnNext = screen.getByRole('button', { name: 'Suivant' })
    await user.click(btnNext)
    await user.click(btnNext)
    expect(await screen.findByText('Page 3 sur 5')).toBeInTheDocument()

    const search = screen.getByRole('searchbox', { name: 'Rechercher un projet' })
    await user.type(search, 'TaskFlow 1')
    expect(await screen.findByText('Page 1 sur 2')).toBeInTheDocument()
  })
})
