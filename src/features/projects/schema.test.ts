import { describe, it, expect } from 'vitest'
import { createProjectSchema } from './schema'

describe('createProjectSchema', () => {
  it('accepte un nom valide', () => {
    const result = createProjectSchema.safeParse({ name: 'Mon projet', description: '' })
    expect(result.success).toBe(true)
  })

  it("n'accepte pas un nom fait d'un espace", () => {
    const result = createProjectSchema.safeParse({ name: ' ', description: '' })
    expect(result.success).toBe(false)
  })

  it("n'accepte pas un nom de 51 caractères", () => {
    const result = createProjectSchema.safeParse({
      name: 'a'.repeat(51),
      description: '',
    })
    expect(result.success).toBe(false)
  })

  it('accepte la valeur maximum de 50', () => {
    const result = createProjectSchema.safeParse({
      name: 'a'.repeat(50),
      description: '',
    })
    expect(result.success).toBe(true)
  })

  it('accepte une description de 200 caractères', () => {
    const result = createProjectSchema.safeParse({
      name: 'Mon projet',
      description: 'a'.repeat(200),
    })
    expect(result.success).toBe(true)
  })
})
