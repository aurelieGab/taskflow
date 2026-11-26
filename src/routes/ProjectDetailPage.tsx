import { AddTaskForm } from '@/features/tasks/components/AddTaskForm'
import { TaskList } from '@/features/tasks/components/TaskList'
import { useParams } from 'react-router'

export function ProjectDetailPage() {
  const { projectId } = useParams()

  if (!projectId) {
    return <p>Ce projet n'existe pas</p>
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="flex font-bold text-blue-600">Tâches du projet</h1>
      <AddTaskForm projectId={projectId} />
      <TaskList projectId={projectId} />
    </div>
  )
}
