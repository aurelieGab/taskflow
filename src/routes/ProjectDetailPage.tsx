import { TaskList } from '@/features/tasks/components/TaskList'
import { useParams } from 'react-router'

export function ProjectDetailPage() {
  const { projectId } = useParams()

  if (!projectId) {
    return <p>Projet introuvable.</p>
  }

  return (
    <section className="flex flex-col gap-8">
      <h1 className="flex font-bold text-blue-600">Tâches du projet</h1>
      <TaskList projectId={projectId} />
    </section>
  )
}
