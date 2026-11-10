import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { Providers } from './app/providers.tsx'

async function enableMocking() {
  const shouldMock = import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCKS === 'true'
  if (!shouldMock) {
    return
  }
  const { worker } = await import('./mocks/browser.ts')

  return worker.start()
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>,
  )
})
