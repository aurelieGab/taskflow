import { Link } from 'react-router'
import { useProjects } from '../hooks/useProjects'

export function ProjectList() {
  const projects = useProjects()

  if (projects.isPending) return <p role="status">Chargement...</p>
  if (projects.isError) return <p role="alert">Impossible de charger les projets</p>
  if (projects.data.length === 0) return <p>Aucun projet pour l’instant</p>
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.data.map((project) => (
        <li key={project.id}>
          <Link
            to={`/projects/${project.id}`}
            className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <h2 className="text-lg font-bold">{project.name}</h2>
            <p className="text-sm text-slate-500">{project.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
