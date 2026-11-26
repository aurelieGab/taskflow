import { createTask } from '@/features/tasks/api/tasksApi'
import type { CreateTaskInput } from '@/features/tasks/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateTask(projectId: string) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (input: CreateTaskInput) => createTask(projectId, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks', projectId] }),
  })

  return mutation
}
