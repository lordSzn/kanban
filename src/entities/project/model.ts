import { createEvent, createStore, sample } from 'effector'
import { loadImportantProjectsFx, loadProjectsFx } from '~/shared/api/internal'
import type { Project, ImportantProjects } from '~/shared/api/internal'

type CreatedProject = Pick<Project, 'description' | 'isFinished'>

export const addProject = createEvent<CreatedProject>()
export const projectAdded = createEvent<Project>()

export const $projects = createStore<Project[]>([]).on(
  loadProjectsFx.doneData,
  (_, projects) => projects
)

export const $importantProjectsID = createStore<ImportantProjects[]>([]).on(
  loadImportantProjectsFx.doneData,
  (_, projects) => projects
)
export const $importantList = createStore<Project[]>([])
export const $activeProjects = createStore<Project[]>([])

sample({
  source: $projects,
  filter: (projects) => projects.length > 0,
  fn: (projects) => projects.filter(({ isFinished }) => !isFinished),
  target: $activeProjects,
})

sample({
  clock: $importantProjectsID,
  source: $projects,
  filter: (projects) => projects.length > 0,
  fn: (projects, favorites) => {
    const favoritesId = favorites.map(({ projectID }) => projectID)
    return projects.filter(({ projectID }) => favoritesId.includes(projectID))
  },
  target: $importantList,
})
