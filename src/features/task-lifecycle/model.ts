import { createEvent, createStore } from 'effector'
import type { TaskLifecycle } from '~/shared/api/internal'

export const takeTask = createEvent<{ taskID: string }>()
export const resolveTask = createEvent<{ taskID: string }>()

export const $taskLifecycle = createStore<TaskLifecycle[]>([])

export const $idleTasks = $taskLifecycle.map((tasks) =>
  tasks.filter((task) => task.status === 'idle')
)

export const $inProcessTasks = $taskLifecycle.map((tasks) =>
  tasks.filter((task) => task.status === 'take')
)

export const $completedTasks = $taskLifecycle.map((tasks) =>
  tasks.filter((task) => task.status === 'resolve')
)
