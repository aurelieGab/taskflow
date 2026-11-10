import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProject } from '../api/projectsApi'

export function useCreateProject() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })

  return mutation
}
