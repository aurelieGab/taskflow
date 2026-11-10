import { useProjects } from '../hooks/useProjects'

export function ProjectList() {
  const projects = useProjects()

  if (projects.isPending) return <p role="status">Chargement...</p>
  if (projects.isError) return <p role="alert">Impossible de charger les projets</p>
  if (projects.data.length === 0) return <p>Aucun projet pour l’instant</p>
  return (
    <ul>
      {projects.data.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
