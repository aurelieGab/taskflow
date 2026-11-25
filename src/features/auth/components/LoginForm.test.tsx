import { describe, it, expect } from 'vitest'

import { screen } from '@testing-library/react'
import { LoginForm } from './LoginForm'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/test/renderWithProviders'

import { LoginPage } from '@/routes/LoginPage'
import { Route, Routes } from 'react-router'

describe('LoginForm', () => {
  it('affiche une erreur avec de mauvais identifiants', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Mot de passe')
    await user.type(emailInput, 'error@example.com')
    await user.type(passwordInput, 'error')
    await user.click(screen.getByRole('button', { name: 'Se connecter' }))

    expect(await screen.findByText('Email ou mot de passe incorrect')).toBeInTheDocument()
  })
  it('redirige vers les projets après une connexion réussie', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<p>Page des projets</p>} />
      </Routes>,
      ['/login'],
    )

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Mot de passe')
    const loginButton = screen.getByRole('button', { name: 'Se connecter' })
    await user.type(emailInput, 'aurelie@taskflow.dev')
    await user.type(passwordInput, 'motdepasse')
    await user.click(loginButton)

    expect(await screen.findByText('Page des projets')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Se connecter' })).not.toBeInTheDocument()
  })
})
