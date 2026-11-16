import { httpClient } from '../../../shared/lib/httpClient'
import type { CreateProjectInput } from '../schema'
import type { Project } from '../types'

export async function fetchProjects(signal?: AbortSignal): Promise<Project[]> {
  return httpClient<Project[]>('/projects', { signal })
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
  return httpClient<Project>('/projects', { method: 'POST', body: JSON.stringify(input) })
}
