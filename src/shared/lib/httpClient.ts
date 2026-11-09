export class ApiError extends Error {
  status: number
  constructor(status: number) {
    super(`HTTP error: ${status}`)
    this.status = status
    this.name = 'ApiError'
  }
}

export async function httpClient<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers)

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(import.meta.env.VITE_API_URL + path, {
    ...options,
    headers,
  })

  if (!response.ok) throw new ApiError(response.status)

  // 204 No Content : pas de corps à lire. L'appelant utilise httpClient<void>.
  if (response.status === 204) return undefined as T

  const data: T = await response.json()

  return data
}
