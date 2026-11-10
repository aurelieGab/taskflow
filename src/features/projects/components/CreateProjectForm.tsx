import { useCreateProject } from '../hooks/useCreateProject'

export function CreateProjectForm() {
  const mutation = useCreateProject()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('projectName')
    const description = formData.get('projectDescription')
    if (typeof name === 'string' && name.trim() && typeof description === 'string') {
      mutation.mutate(
        {
          name: name.trim(),
          description: description.trim(),
        },
        {
          onSuccess: () => {
            form.reset()
          },
        },
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="projectName">Nom</label>
        <input id="projectName" name="projectName" required />
      </div>
      <div>
        <label htmlFor="projectDescription">Description</label>
        <input id="projectDescription" name="projectDescription" />
      </div>
      <button disabled={mutation.isPending} type="submit">
        {mutation.isPending ? 'Création...' : 'Créer'}
      </button>
      {mutation.isError && <p role="alert">Impossible de créer le projet.</p>}
    </form>
  )
}
