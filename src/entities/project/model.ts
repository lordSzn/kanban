import { combine, createEvent, createStore, sample } from 'effector'
import { MouseEvent } from 'react'
import { loadProjectsFx, projectCreateFx } from '~/shared/api/internal'
import type { Project } from '~/shared/api/internal'
import { showMessage } from '~/shared/lib/toast'
import { getFileUrl } from './library'

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

export const showCreationForm = createEvent<MouseEvent>()
export const hideCreationForm = createEvent()

export const formSubmitted = createEvent()

export const $visibleDraftProject = createStore(false)
  .on(showCreationForm, () => true)
  .on(hideCreationForm, () => false)
  .reset(projectCreateFx.done)

export const $saveProjectLoading = projectCreateFx.pending

export const titleChanged = createEvent<string>()
export const descriptionChanged = createEvent<string>()
export const photoUploaded = createEvent<File[]>()

export const $title = createStore('')
  .on(titleChanged, (_, title) => title)
  .reset(projectCreateFx.done)

export const $description = createStore('')
  .on(descriptionChanged, (_, description) => description)
  .reset(projectCreateFx.done)

export const $photo = createStore<File | null>(null)
  .on(photoUploaded, (_, file) => file[0])
  .reset(projectCreateFx.done)

export const $photoUrl = createStore('').reset(projectCreateFx.done)

sample({
  source: $photo,
  filter: Boolean,
  fn: getFileUrl,
  target: $photoUrl,
})

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
  clock: formSubmitted,
  source: $createdProject,
  filter: $validCreatedProject,
  target: projectCreateFx,
})

showMessage({
  when: projectCreateFx.done,
  toast: () => ({
    type: 'success',
    text: 'The project is successfully established',
  }),
})
