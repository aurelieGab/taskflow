import { CreateProjectForm } from '@/features/projects/components/CreateProjectForm'
import { ProjectList } from '@/features/projects/components/ProjectList'

export function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="flex font-bold text-blue-600">Projets</h1>
      <CreateProjectForm />
      <ProjectList />
    </div>
  )
}
