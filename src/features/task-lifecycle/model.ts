import { combine, createEvent, createStore } from 'effector'
import { $tasks } from '~/entities/task'
import { loadTasksLifecycleFx, TaskLifecycle } from '~/shared/api/requests'

export const takeTask = createEvent<{ taskID: string }>()
export const resolveTask = createEvent<{ taskID: string }>()

export const $taskLifecycle = createStore<TaskLifecycle[]>([]).on(
  loadTasksLifecycleFx.doneData,
  (_, tasks) => tasks
)

const $idleTasksIdx = $taskLifecycle.map((tasks) =>
  tasks.filter((task) => task.status === 'idle').map((task) => task.taskID)
)

const $takeTasksIdx = $taskLifecycle.map((tasks) =>
  tasks.filter((task) => task.status === 'take').map((task) => task.taskID)
)

const $resolveTasksIdx = $taskLifecycle.map((tasks) =>
  tasks.filter((task) => task.status === 'take').map((task) => task.taskID)
)

export const $idleTasks = combine([$idleTasksIdx, $tasks], ([idx, tasks]) => {
  return tasks.filter((task) => idx.includes(task.taskID))
})

export const $processingTasks = combine([$takeTasksIdx, $tasks], ([idx, tasks]) => {
  return tasks.filter((task) => idx.includes(task.taskID))
})

export const $completedTasks = combine([$resolveTasksIdx, $tasks], ([idx, tasks]) => {
  return tasks.filter((task) => idx.includes(task.taskID))
})
