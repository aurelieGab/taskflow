import { useTasks } from '@/features/tasks/hooks/useTasks'
import { cn } from '@/shared/lib/cn'
import { ApiError } from '@/shared/lib/httpClient'

type TaskListProps = {
  projectId: string
}

export function TaskList({ projectId }: TaskListProps) {
  const tasks = useTasks(projectId)

  if (tasks.isPending)
    return (
      <p
        role="status"
        className="rounded-lg border border-dashed border-slate-200 p-20 text-center text-slate-700"
      >
        Chargement des tâches
      </p>
    )

  if (tasks.isError) {
    const errorMessage =
      tasks.error instanceof ApiError && tasks.error.status === 404
        ? "Ce projet n'existe pas"
        : 'Impossible de charger les tâches'

    return (
      <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        {errorMessage}
      </p>
    )
  }

  if (tasks.data.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-200 p-20 text-center text-slate-700">
        Aucune tâche
      </p>
    )
  }

  return (
    <ul>
      {tasks.data.map((task) => (
        <li key={task.id} className={cn(task.done && 'text-slate-500 line-through')}>
          {task.title}
          <span className="sr-only">{task.done ? 'Terminée' : 'À faire'}</span>
        </li>
      ))}
    </ul>
  )
}
