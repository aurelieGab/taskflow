import { httpClient } from '../../../shared/lib/httpClient'
import type { User } from '../types'
import type { LoginInput } from '../schema'

export const login = (input: LoginInput) =>
  httpClient<User>('/login', {
    method: 'POST',
    body: JSON.stringify(input),
  })

export const fetchMe = (signal?: AbortSignal) => httpClient<User>('/me', { signal })

export const logout = () => httpClient<void>('/logout', { method: 'POST' })
