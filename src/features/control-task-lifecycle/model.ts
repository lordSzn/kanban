import { combine, createStore, sample } from 'effector'
import { $tasks } from '~/entities/task'
import { loadTasksLifecycleFx } from '~/shared/api/requests'
import type { Status } from '~/shared/api/requests'
import { createTaskLifeCycleState, createTasksStructure } from './library'

export const taskLifecycleState = createTaskLifeCycleState()

sample({
  clock: loadTasksLifecycleFx.doneData,
  target: taskLifecycleState.initItems,
})

export const $normalizeTasks = combine([$tasks, taskLifecycleState.$lifecycle], ([meta, tasks]) =>
  createTasksStructure(meta, tasks)
)

// @tempore solution
export const $boards = createStore<Status[]>(['idle', 'take', 'resolve'])
