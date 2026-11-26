import type { CreateTaskInput } from '@/features/tasks/schema'
import type { Task } from '@/features/tasks/types'
import { httpClient } from '@/shared/lib/httpClient'

export async function fetchTasks(projectId: string, signal: AbortSignal): Promise<Task[]> {
  return httpClient<Task[]>(`/projects/${projectId}/tasks`, { signal })
}

export async function createTask(projectId: string, input: CreateTaskInput): Promise<Task> {
  return httpClient<Task>(`/projects/${projectId}/tasks`, {
    method: 'POST',
    body: JSON.stringify(input),
  })
}
