import { useCreateTask } from '@/features/tasks/hooks/useCreateTask'
import { createTaskSchema, type CreateTaskInput } from '@/features/tasks/schema'
import { ApiError } from '@/shared/lib/httpClient'
import { Button } from '@/shared/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type AddTaskFormProps = {
  projectId: string
}
export function AddTaskForm({ projectId }: AddTaskFormProps) {
  const mutation = useCreateTask(projectId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { title: '' },
  })

  const onSubmit = (data: CreateTaskInput) => {
    mutation.mutate(data, {
      onSuccess: () => reset(),
    })
  }

  const errorMessage =
    mutation.error instanceof ApiError && mutation.error.status === 404
      ? "Ce projet n'existe pas"
      : "Impossible d'ajouter la tâche. Réessayez."

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-8 rounded-md border border-gray-200 p-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="taskTitle" className="text-sm font-medium">
          Ajouter une tâche
        </label>
        <input
          {...register('title')}
          id="taskTitle"
          type="text"
          className="rounded-md border border-gray-200 px-4 py-2 outline-hidden focus:ring-2 focus:ring-blue-500 aria-invalid:border-red-600"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'taskTitle-error' : undefined}
          aria-required="true"
        />
        {errors.title && (
          <p id="taskTitle-error" className="text-sm text-red-600">
            {errors.title.message}
          </p>
        )}
      </div>
      <Button disabled={mutation.isPending} type="submit" className="self-center">
        {mutation.isPending ? 'En cours de création' : 'Créer'}
      </Button>
      {mutation.isError && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-100 p-4 text-red-600">
          {errorMessage}
        </p>
      )}
    </form>
  )
}
