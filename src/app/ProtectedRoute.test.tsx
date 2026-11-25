import { describe, expect, it } from 'vitest'
import { server } from '../mocks/node'
import { http, HttpResponse } from 'msw/http'
import { renderWithProviders } from '../test/renderWithProviders'
import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router'
import { ProtectedRoute } from './ProtectedRoute'
import { ProjectList } from '../features/projects/components/ProjectList'

describe('ProtectedRoute', () => {
  it("affiche la page quand l'utilisateur est connecté", async () => {
    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/me`, () =>
        HttpResponse.json({ id: '1', email: 'aurelie@taskflow.dev', name: 'Aurélie' }),
      ),
    )

    renderWithProviders(
      <Routes>
        <Route path="/login" element={<p>Page de connexion</p>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/projects" element={<p>Page des projets</p>} />
        </Route>
      </Routes>,
      ['/projects'],
    )

    expect(await screen.findByText('Page des projets')).toBeInTheDocument()
  })

  it("redirige vers /login quand personne n'est connecté", async () => {
    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/me`, () =>
        HttpResponse.json(null, { status: 401 }),
      ),
    )

    renderWithProviders(
      <Routes>
        <Route path="/login" element={<p>Page de connexion</p>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/projects" element={<p>Page des projets</p>} />
        </Route>
      </Routes>,
      ['/projects'],
    )

    expect(await screen.findByText('Page de connexion')).toBeInTheDocument()
  })

  it('redirige vers /login quand la session expire', async () => {
    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/me`, () =>
        HttpResponse.json({ id: '1', email: 'aurelie@taskflow.dev', name: 'Aurélie' }),
      ),
      http.get(`${import.meta.env.VITE_API_URL}/projects`, () =>
        HttpResponse.json({ message: 'Non authentifié' }, { status: 401 }),
      ),
    )

    renderWithProviders(
      <Routes>
        <Route path="/login" element={<p>Page de connexion</p>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/projects" element={<ProjectList />} />
        </Route>
      </Routes>,
      ['/projects'],
    )

    expect(await screen.findByText('Page de connexion')).toBeInTheDocument()
  })
})
