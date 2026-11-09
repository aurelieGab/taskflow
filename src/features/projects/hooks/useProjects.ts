import { useEffect, useState } from 'react'
import type { Project } from '../types'
import { fetchProjects } from '../api/projectsApi'

export type ProjectsState =
  { status: 'loading' } | { status: 'success'; data: Project[] } | { status: 'error'; error: Error }

export function useProjects(): ProjectsState {
  const [projectsState, setProjectsState] = useState<ProjectsState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const data = await fetchProjects(controller.signal)
        setProjectsState({ status: 'success', data })
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== 'AbortError') setProjectsState({ status: 'error', error })
        } else {
          setProjectsState({
            status: 'error',
            error: new Error('Une erreur est survenue'),
          })
        }
      }
    }

    fetchData()

    return () => controller.abort()
  }, [])

  return projectsState
}
