import { createEvent, createStore } from 'effector'

export interface Project {
  projectID: string
  description: string
  isFinished: string
}

export const addProject = createEvent<Pick<Project, 'description' | 'isFinished'>>()
export const projectAdded = createEvent<Project>()

export const $projects = createStore<Project[]>([])
