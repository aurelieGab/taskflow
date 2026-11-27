import '@testing-library/jest-dom/vitest'
import { afterEach, beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'

import { server } from '@/mocks/node'
import { resetSession, resetTasks } from '@/mocks/handlers'

beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
afterEach(() => {
  cleanup()
  server.resetHandlers()
  resetSession()
  resetTasks()
})
afterAll(() => server.close())
