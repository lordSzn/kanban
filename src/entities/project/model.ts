import { createEvent, createStore, sample } from 'effector'
import { loadProjectsFx } from '~/shared/api/internal'
import type { Project } from '~/shared/api/internal'

type CreatedProject = Pick<Project, 'description' | 'isFinished'>

export const addProject = createEvent<CreatedProject>()
export const projectAdded = createEvent<Project>()

export const $projects = createStore<Project[]>([])
export const $activeProjects = createStore<Project[]>([])

$projects.on(loadProjectsFx.doneData, (projects, answer) =>
  projects.concat(answer)
)

sample({
  source: $projects,
  filter: (projects) => projects.length > 0,
  fn: (projects) => projects.filter(({ isFinished }) => !isFinished),
  target: $activeProjects,
})
