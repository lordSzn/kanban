import { combine, createEvent, createStore, sample } from 'effector'
import {
  loadImportantProjectsFx,
  loadProjectsFx,
  projectCreateFx,
  saveFavoriteProjectFx,
} from '~/shared/api/internal'
import type { Project, ImportantProjects } from '~/shared/api/internal'

export const $projects = createStore<Project[]>([])
  .on(loadProjectsFx.doneData, (_, projects) => projects)
  .on(projectCreateFx.doneData, (projects, newProject) =>
    projects.concat(newProject)
  )

export const $importantProjects = createStore<ImportantProjects[]>([])
  .on(loadImportantProjectsFx.doneData, (_, projectsID) => projectsID)
  .on(saveFavoriteProjectFx.doneData, (favorites, addedId) =>
    favorites.concat(addedId)
  )

export const $importantList = createStore<Project[]>([])
export const $activeProjects = createStore<Project[]>([])
export const $finishedProjects = createStore<Project[]>([])

sample({
  source: $projects,
  filter: (projects) => projects.length > 0,
  fn: (projects) => projects.filter(({ isFinished }) => !isFinished),
  target: $activeProjects,
})

sample({
  source: $projects,
  filter: (projects) => projects.length > 0,
  fn: (projects) => projects.filter(({ isFinished }) => isFinished),
  target: $finishedProjects,
})

export const favoriteAdd = createEvent<{ favoriteID: string }>()
export const $favoriteIdx = $importantProjects.map((projects) =>
  projects.map(({ projectID }) => projectID)
)

sample({
  clock: $favoriteIdx,
  source: $projects,
  filter: (projects) => projects.length > 0,
  fn: (projects, favoriteIdx) => {
    return projects.filter(({ projectID }) => favoriteIdx.includes(projectID))
  },
  target: $importantList,
})

sample({
  clock: favoriteAdd,
  source: $favoriteIdx,
  filter: (oldListFavorites, { favoriteID }) => {
    return !oldListFavorites.includes(favoriteID)
  },
  fn: (_, favoriteID) => favoriteID,
  target: saveFavoriteProjectFx,
})

export const createProject = createEvent()
export const closeProject = createEvent()

export const projectAdd = createEvent()

export const $visibleDraftProject = createStore(false)
  .on(createProject, () => true)
  .on(closeProject, () => false)
  .reset(projectCreateFx.done)

export const $saveProjectLoading = projectCreateFx.pending

export const titleChanged = createEvent<string>()
export const descriptionChanged = createEvent<string>()

export const $title = createStore('')
  .on(titleChanged, (_, title) => title)
  .reset(projectCreateFx.done)

export const $description = createStore('')
  .on(descriptionChanged, (_, description) => description)
  .reset(projectCreateFx.done)

export const $validCreatedProject = combine(
  [$title, $description],
  ([title, description]) => {
    return (
      title.trim().length > 5 &&
      description.trim().length > 10 &&
      description.trim().length < 25
    )
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
  target: projectCreateFx,
})
