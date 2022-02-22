import { createEvent, createStore } from 'effector'
import { loadProjectsFx } from '~/shared/api/internal'

export interface Project {
  projectID: string
  title: string
  description: string
  isFinished: boolean
  photoUrl: string
}

type CreatedProject = Pick<Project, 'description' | 'isFinished'>

export const addProject = createEvent<CreatedProject>()
export const projectAdded = createEvent<Project>()

export const $projects = createStore<Project[]>([])

$projects.on(loadProjectsFx.doneData, (projects, answer) =>
  projects.concat(answer)
)
