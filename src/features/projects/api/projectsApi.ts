import { httpClient } from '../../../shared/lib/httpClient'
import type { Project } from '../types'

export async function fetchProjects(signal?: AbortSignal): Promise<Project[]> {
  return httpClient<Project[]>('/projects', { signal })
}
