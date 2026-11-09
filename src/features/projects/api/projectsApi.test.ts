import { describe, it, vi, expect } from 'vitest'
import { fetchProjects } from './projectsApi'
import type { Project } from '../types'

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
})
