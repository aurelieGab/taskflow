import { Link, useSearchParams } from 'react-router'
import { useProjects } from '../hooks/useProjects'

const gridClassName = 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'

export function ProjectList() {
  const projects = useProjects()
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''

  if (projects.isPending)
    return (
      <div role="status">
        <span className="sr-only">Chargement des projets</span>
        <ul className={gridClassName} aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <li key={n} className="animate-pulse rounded-lg border border-slate-200 p-4">
              <div className="h-5 w-1/2 rounded bg-slate-200" />
              <div className="mt-2 h-4 w-3/4 rounded bg-slate-100" />
            </li>
          ))}
        </ul>
      </div>
    )
  if (projects.isError)
    return (
      <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        Impossible de charger les projets
      </p>
    )
  if (projects.data.length === 0)
    return (
      <p className="rounded-lg border border-dashed border-slate-200 p-20 text-center text-slate-700">
        Aucun projet pour l’instant
      </p>
    )

  const filteredProjects = projects.data.filter((project) =>
    project.name.toLowerCase().includes(search.trim().toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-8">
      <div>
        <label htmlFor="search" className="text-sm font-bold">
          Rechercher un projet
        </label>
        <input
          id="search"
          type="search"
          value={search}
          onChange={(e) => setSearchParams({ q: e.target.value }, { replace: true })}
          className="w-full rounded-md border border-slate-200 p-2 outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <p role="status" className="sr-only">
        {filteredProjects.length}{' '}
        {filteredProjects.length > 1 ? 'projets trouvés' : 'projet trouvé'}
      </p>
      {filteredProjects.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-200 p-20 text-center text-slate-700">
          Aucun projet ne correspond à "{search}"
        </p>
      ) : (
        <ul className={gridClassName}>
          {filteredProjects.map((project) => (
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
      )}
    </div>
  )
}
