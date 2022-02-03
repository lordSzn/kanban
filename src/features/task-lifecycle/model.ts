import { createEvent, createStore } from 'effector'

export type Status = 'idle' | 'take' | 'resolve'

export interface TaskLifecycle {
  taskID: string
  projectID: string
  status: Status
}

export const takeTask = createEvent<{ taskID: string }>()
export const resolveTask = createEvent<{ taskID: string }>()

export const $taskLifecycle = createStore<TaskLifecycle[]>([])
