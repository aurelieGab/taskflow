import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter, type InitialEntry } from 'react-router'
import { createQueryClient } from '../shared/lib/queryClient'

export function renderWithProviders(ui: ReactNode, initialEntries?: InitialEntry[]) {
  const queryClient = createQueryClient({
    retry: false,
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
    </QueryClientProvider>,
  )
}
