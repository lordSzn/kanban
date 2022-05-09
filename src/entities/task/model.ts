import { createEvent, createStore } from 'effector'
import { loadTasksFx, Task } from '~/shared/api/requests'

export const updateTaskInfo = createEvent<{ taskID: string }>()

export const $tasks = createStore<Record<string, Task>>({}).on(
  loadTasksFx.doneData,
  (_, tasks) => tasks
)
export const titleChanged = createEvent<string>()
export const descriptionChanged = createEvent<string>()
export const $title = createStore('')
  .on(titleChanged, (_, title) => title)
  .reset(addTaskToLifecycleFx.doneData)
export const $description = createStore('')
  .on(descriptionChanged, (_, description) => description)
  .reset(addTaskToLifecycleFx.doneData)
export const $label = createStore([]).reset(taskSave)
export const $label = createStore([]).reset(addTaskToLifecycleFx.doneData)
