import { useQuery } from '@tanstack/react-query'
import { fetchMe } from '../api/authApi'
import { ApiError } from '../../../shared/lib/httpClient'

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async ({ signal }) => {
      try {
        return await fetchMe(signal)
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) return null
        throw error
      }
    },
  })
}
