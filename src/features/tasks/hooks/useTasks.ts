import { fetchTasks } from '@/features/tasks/api/tasksApi'
import { useQuery } from '@tanstack/react-query'

export function useTasks(projectId: string) {
  const query = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: ({ signal }) => fetchTasks(projectId, signal),
  })

  return query
}
