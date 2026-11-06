import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Greeting } from './Greeting'

describe('Greeting', () => {
  it('affiche le name passée en props', () => {
    render(<Greeting name="Marie" />)
    expect(screen.getByRole('heading', { name: 'Bonjour Marie' })).toBeInTheDocument()
  })
})
