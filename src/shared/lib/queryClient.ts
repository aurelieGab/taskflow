import { QueryCache, QueryClient, type DefaultOptions } from '@tanstack/react-query'
import { ApiError } from './httpClient'

export function createQueryClient(queries: DefaultOptions['queries']) {
  const client = new QueryClient({
    defaultOptions: {
      queries,
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof ApiError && error.status === 401) client.setQueryData(['me'], null)
      },
    }),
  })

  return client
}

export const queryClient = createQueryClient({
  staleTime: 60 * 1000,
})
