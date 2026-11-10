import { CreateProjectForm } from '../features/projects/components/CreateProjectForm'
import { ProjectList } from '../features/projects/components/ProjectList'

export function ProjectsPage() {
  return (
    <>
      <h1>Projets</h1>
      <CreateProjectForm />
      <ProjectList />
    </>
  )
}
