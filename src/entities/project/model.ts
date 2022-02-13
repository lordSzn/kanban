import { createEvent, createStore } from 'effector'

export interface Project {
  projectID: string
  description: string
  isFinished: string
}

type CreatedProject = Pick<Project, 'description' | 'isFinished'>

export const addProject = createEvent<CreatedProject>()
export const projectAdded = createEvent<Project>()

export const $projects = createStore<Project[]>([])
