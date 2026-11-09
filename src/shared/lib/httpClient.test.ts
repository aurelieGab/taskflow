import { describe, expect, it, vi } from 'vitest'
import { httpClient, ApiError } from './httpClient'

describe('httpClient', () => {
  it('renvoie les données JSON quand la réponse est ok', async () => {
    const fakeFetch = vi.fn()

    vi.stubGlobal(
      'fetch',
      fakeFetch.mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => [{ id: 1, title: 'Ma tâche' }],
      }),
    )
    const result = await httpClient('/tasks')

    expect(result).toEqual([{ id: 1, title: 'Ma tâche' }])
  })
  it('lève une ApiError quand le serveur répond 404', async () => {
    const fakeFetch = vi.fn()

    vi.stubGlobal(
      'fetch',
      fakeFetch.mockResolvedValue({
        status: 404,
        ok: false,
      }),
    )
    const promise = httpClient('/tasks')

    await expect(promise).rejects.toThrow('HTTP error: 404')
    await expect(promise).rejects.toBeInstanceOf(ApiError)
    await expect(promise).rejects.toHaveProperty('status', 404)
  })

  it('appelle httpClient avec la bonne url api', async () => {
    const fakeFetch = vi.fn()
    vi.stubEnv('VITE_API_URL', 'https://api.test')

    vi.stubGlobal(
      'fetch',
      fakeFetch.mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => [{ id: 1, title: 'Ma tâche' }],
      }),
    )

    await httpClient('/tasks')
    expect(fakeFetch).toHaveBeenCalledWith('https://api.test/tasks', expect.anything())
  })

  it('appelle fetch avec le content-type: application/json par défaut', async () => {
    const fakeFetch = vi.fn()

    vi.stubGlobal(
      'fetch',
      fakeFetch.mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => [{ id: 1, title: 'Ma tâche' }],
      }),
    )

    await httpClient('/tasks')

    const options = fakeFetch.mock.calls[0]![1]

    expect(options.headers.get('Content-Type')).toBe('application/json')
  })
})
