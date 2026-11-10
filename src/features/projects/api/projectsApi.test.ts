import { describe, it, vi, expect } from 'vitest'
import { fetchProjects } from './projectsApi'
import type { Project } from '../types'
import { ApiError } from '../../../shared/lib/httpClient'

describe('fetchProjects', () => {
  const projects: Project[] = [
    { id: '1', name: 'TaskFlow', description: 'Mon projet', createdAt: '2026-11-09' },
  ]
  it('renvoie la liste des projets reçue du serveur', async () => {
    const fakeFetch = vi.fn()

    vi.stubGlobal(
      'fetch',
      fakeFetch.mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => projects,
      }),
    )

    const result = await fetchProjects()

    expect(result).toEqual(projects)
  })

  it('lève une API error 500 quand le serveur répond 500', async () => {
    const fakeFetch = vi.fn()
    vi.stubGlobal(
      'fetch',
      fakeFetch.mockResolvedValue({
        status: 500,
        ok: false,
      }),
    )

    const promise = fetchProjects()
    await expect(promise).rejects.toBeInstanceOf(ApiError)
    await expect(promise).rejects.toHaveProperty('status', 500)
  })
})
