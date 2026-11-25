import type { Task } from '@/features/tasks/types'
import { httpClient } from '@/shared/lib/httpClient'

export async function fetchTasks(projectId: string, signal?: AbortSignal): Promise<Task[]> {
  return httpClient<Task[]>(`/projects/${projectId}/tasks`, { signal })
}
