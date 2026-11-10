import { fetchProjects } from '../api/projectsApi'
import { useQuery } from '@tanstack/react-query'

export function useProjects() {
  const query = useQuery({
    queryKey: ['projects'],
    queryFn: ({ signal }) => fetchProjects(signal),
  })

  return query
}
