import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { CreateProjectForm } from './CreateProjectForm'
import { renderWithProviders } from '@/test/renderWithProviders'

describe('CreateProjectForm', () => {
  it('vide le formulaire après la création d’un projet', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CreateProjectForm />)

    const nameInput = screen.getByLabelText('Nom')
    await user.type(nameInput, 'Test Input')
    await user.click(screen.getByRole('button', { name: 'Créer' }))
    await waitFor(() => expect(nameInput).toHaveValue(''))
  })

  it('affiche une erreur si on envoie le formulaire sans nom', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CreateProjectForm />)
    const nameInput = screen.getByLabelText('Nom')

    await user.click(screen.getByRole('button', { name: 'Créer' }))

    expect(await screen.findByText('Le nom est obligatoire')).toBeInTheDocument()
    expect(nameInput).toHaveAttribute('aria-invalid', 'true')
    expect(nameInput).toHaveAccessibleDescription('Le nom est obligatoire')
  })
})
