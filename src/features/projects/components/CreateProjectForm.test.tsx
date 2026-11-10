import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { CreateProjectForm } from './CreateProjectForm'
import { renderWithProviders } from '../../../test/renderWithProviders'

describe('CreateProjectForm', () => {
  it('vide le formulaire après la création d’un projet', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CreateProjectForm />)

    const nameInput = screen.getByLabelText('Nom')
    await user.type(nameInput, 'Test Input')
    await user.click(screen.getByRole('button', { name: 'Créer' }))
    await waitFor(() => expect(nameInput).toHaveValue(''))
  })
})
