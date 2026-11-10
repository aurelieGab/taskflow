export type Project = {
  id: string
  name: string
  description: string
  createdAt: string
}

export type CreateProjectInput = Pick<Project, 'name' | 'description'>
