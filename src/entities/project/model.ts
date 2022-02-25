import { combine, createEvent, createStore, sample } from 'effector'
import { loadProjectsFx, projectCreateFx } from '~/shared/api/internal'
import type { Project } from '~/shared/api/internal'

export const $projects = createStore<Project[]>([])
  .on(loadProjectsFx.doneData, (_, projects) => projects)
  .on(projectCreateFx.doneData, (projects, newProject) =>
    projects.concat(newProject)
  )

export const $activeProjects = $projects.map((projects) =>
  projects.filter(({ isFinished }) => !isFinished)
)
export const $finishedProjects = $projects.map((projects) =>
  projects.filter(({ isFinished }) => isFinished)
)

export const createProject = createEvent()
export const closeCreateProject = createEvent()

export const projectAdd = createEvent()

export const $visibleDraftProject = createStore(false)
  .on(createProject, () => true)
  .on(closeCreateProject, () => false)
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
