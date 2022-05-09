import { attach, combine, createEvent, createStore, sample } from 'effector'
import { addTaskFx, addTaskToLifecycleFx, loadTasksFx, Task } from '~/shared/api/requests'

export const showTaskForm = createEvent()
export const hideTaskForm = createEvent()

export const titleChanged = createEvent<string>()
export const descriptionChanged = createEvent<string>()

export const updateTasksInfo = createEvent<Record<string, Task>>()
export const taskSaveFx = attach({ effect: addTaskFx })
export const taskSave = createEvent()

export const $isOpenForm = createStore(false)
  .on(showTaskForm, () => true)
  .on(hideTaskForm, () => false)
  .reset(taskSaveFx.doneData)

export const $tasks = createStore<Record<string, Task>>({})
  .on(loadTasksFx.doneData, (_, tasks) => tasks)
  .on(updateTasksInfo, (tasks, task) => ({ ...tasks, ...task }))

export const $title = createStore('')
  .on(titleChanged, (_, title) => title)
  .reset(addTaskToLifecycleFx.doneData)
export const $description = createStore('')
  .on(descriptionChanged, (_, description) => description)
  .reset(addTaskToLifecycleFx.doneData)
export const $label = createStore([]).reset(addTaskToLifecycleFx.doneData)

export const $taskValid = combine([$title, $description], ([title, description]) => {
  return title.trim().length > 1 && description.trim().length > 1
})

export const $task = combine({
  title: $title,
  description: $description,
  label: $label,
})

sample({
  clock: taskSave,
  source: $task,
  filter: $taskValid,
  fn: (task) => task,
  target: taskSaveFx,
})

sample({
  clock: taskSaveFx.doneData,
  source: $task,
  filter: Boolean,
  fn: (task, taskId) => ({ [taskId]: task }),
  target: updateTasksInfo,
})
