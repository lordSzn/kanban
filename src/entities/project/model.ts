import { combine, createEvent, createStore, sample } from 'effector'
import {
  loadImportantProjectsFx,
  loadProjectsFx,
  projectCreate,
} from '~/shared/api/internal'
import type { Project, ImportantProjects } from '~/shared/api/internal'

export const $projects = createStore<Project[]>([])
  .on(loadProjectsFx.doneData, (_, projects) => projects)
  .on(projectCreate.doneData, (projects, newProject) =>
    projects.concat(newProject)
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

export const createProject = createEvent()
export const closeProject = createEvent()

export const projectAdd = createEvent()

export const $visibleDraftProject = createStore(false)
  .on(createProject, () => true)
  .on(closeProject, () => false)
  .reset(projectCreate.done)

export const $saveProjectLoading = createStore(false)
  .on(projectAdd, () => true)
  .reset(projectCreate.done)

export const titleChanged = createEvent<string>()
export const descriptionChanged = createEvent<string>()

export const $title = createStore('')
  .on(titleChanged, (_, title) => title)
  .reset(projectCreate.done)

export const $description = createStore('')
  .on(descriptionChanged, (_, description) => description)
  .reset(projectCreate.done)

export const $validCreatedProject = combine(
  [$title, $description],
  ([title, description]) => {
    return title.trim().length > 5 && description.trim().length > 10
  }
)

export const $createdProject = combine({
  title: $title,
  description: $description,
})

sample({
  clock: projectAdd,
  source: $createdProject,
  filter: $validCreatedProject,
  target: projectCreate,
})
