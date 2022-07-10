import { composeFields, createField } from 'composable-forms'
// TODO FIX
// eslint-disable-next-line import/no-unresolved
import { createInput } from 'composable-forms/custom'
import { createEvent, createStore, sample } from 'effector'
import Joi from 'joi'
import { parseToUrl } from '~/entities/project/lib'
import { loadProjectsFx, projectCreateFx } from '~/shared/api/requests'
import type { Project } from '~/shared/api/requests'
import { showMessage } from '~/shared/lib/toast'

export const $saveProjectLoading = projectCreateFx.pending

export const $projects = createStore<Project[]>([])
  .on(loadProjectsFx.doneData, (_, projects) => projects)
  .on(projectCreateFx.doneData, (projects, newProject) => [...projects, newProject])
export const $activeProjects = $projects.map((projects) =>
  projects.filter(({ isFinished }) => !isFinished)
)
export const $finishedProjects = $projects.map((projects) =>
  projects.filter(({ isFinished }) => isFinished)
)

export const showCreationForm = createEvent()
export const hideCreationForm = createEvent()

export const $isOpenDraftProject = createStore(false)
  .on(showCreationForm, () => true)
  .on(hideCreationForm, () => false)
  .reset(projectCreateFx.done)

export const title = createInput<string>({
  schema: Joi.string().required().min(3).max(10).messages({
    'string.max': 'Title is too long',
    'string.min': 'Title should be of minimum 3 characters length',
    'string.empty': 'Title must be filled out',
  }),
  initialValue: '',
})

export const description = createInput<string>({
  schema: Joi.string().required().min(5).max(100).messages({
    'string.max': 'Description is too long',
    'string.min': 'Description should be of minimum 5 characters length',
    'string.empty': 'Description must be filled out',
  }),
  initialValue: '',
})

export const photoUploaded = createEvent<File>()

export const $photoUrl = createStore<string>('')
  .on(photoUploaded, (_, file) => parseToUrl(file))
  .reset(projectCreateFx.done)
export const photo = createField<File | null>({
  schema: Joi.any(),
  initialValue: null,
})

photo.$value.on(photoUploaded, (_, file) => file)

export const projectForm = composeFields({
  fields: { title, description, photo },
})

export const formSubmitted = createEvent()

sample({
  clock: formSubmitted,
  source: projectForm.$value,
  filter: projectForm.$hasErrors.map((is) => !is),
  target: projectCreateFx,
})

sample({
  clock: projectCreateFx.done,
  fn: () => undefined,
  target: projectForm.restored,
})

showMessage({
  when: projectCreateFx.done,
  toast: () => ({ type: 'success', text: 'The project is successfully established' }),
})
