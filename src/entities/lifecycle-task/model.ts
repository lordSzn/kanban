import { createStore } from 'effector'

export type Status = 'idle' | 'take' | 'resolve'

export interface TaskLifecycle {
  taskID: string
  projectID: string
  status: Status
}

export const $taskLifecycle = createStore<TaskLifecycle[]>([])
