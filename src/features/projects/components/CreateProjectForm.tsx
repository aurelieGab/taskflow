import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateProject } from '../hooks/useCreateProject'
import { createProjectSchema, type CreateProjectInput } from '../schema'
import { Button } from '@/shared/ui/button'

const inputClassName =
  'w-full rounded-md border border-slate-200 p-2 focus:ring-2 focus:ring-blue-500 outline-hidden aria-[invalid=true]:border-red-500'

export function CreateProjectForm() {
  const mutation = useCreateProject()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: '', description: '' },
  })

  const onSubmit = (data: CreateProjectInput) => {
    mutation.mutate(data, {
      onSuccess: () => reset(),
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-6 rounded-lg border border-slate-200 bg-white p-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="projectName" className="text-sm font-bold">
          Nom
        </label>
        <input
          id="projectName"
          {...register('name')}
          className={inputClassName}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'projectName-error' : undefined}
          aria-required="true"
        />
        {errors.name && (
          <p id="projectName-error" className="text-sm text-red-700">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="projectDescription" className="text-sm font-bold">
          Description
        </label>
        <input
          id="projectDescription"
          {...register('description')}
          className={inputClassName}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'projectDescription-error' : undefined}
        />
        {errors.description && (
          <p id="projectDescription-error" className="text-sm text-red-700">
            {errors.description.message}
          </p>
        )}
      </div>
      <Button disabled={mutation.isPending} type="submit" className="self-center">
        {mutation.isPending ? 'Création...' : 'Créer'}
      </Button>
      {mutation.isError && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
          Impossible de créer le projet.
        </p>
      )}
    </form>
  )
}
