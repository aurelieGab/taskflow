import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('appelle onClick au click', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Créer</Button>)
    await user.click(screen.getByRole('button', { name: 'Créer' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("n'appelle onClick au click si le bouton est disabled", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Créer
      </Button>,
    )

    await user.click(screen.getByRole('button', { name: 'Créer' }))

    expect(onClick).not.toHaveBeenCalled()
  })

  it("rend un button de type='button' par défaut", () => {
    render(<Button>Créer</Button>)

    expect(screen.getByRole('button', { name: 'Créer' })).toHaveAttribute('type', 'button')
  })

  it('rend un button avec le type qui est passé en prop', () => {
    render(<Button type="submit">Créer</Button>)

    expect(screen.getByRole('button', { name: 'Créer' })).toHaveAttribute('type', 'submit')
  })
})
