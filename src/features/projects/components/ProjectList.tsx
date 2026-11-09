import { useProjects } from '../hooks/useProjects'

export function ProjectList() {
  const projectsState = useProjects()

  if (projectsState.status === 'loading') return <p role="status">Chargement...</p>
  if (projectsState.status === 'error') return <p role="alert">Impossible de charger les projets</p>
  if (projectsState.data.length === 0) return <p>Aucun projet pour l’instant</p>
  return (
    <ul>
      {projectsState.data.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
