import { combine, sample } from 'effector'
import { $tasks } from '~/entities/task'
import { loadTasksLifecycleFx } from '~/shared/api/requests'
import type { Status, Task, TaskLifecycle } from '~/shared/api/requests'
import { createTaskLifeCycleState } from './library'

export const taskLifecycleState = createTaskLifeCycleState()

sample({
  clock: loadTasksLifecycleFx.doneData,
  target: taskLifecycleState.initItems,
})

export type NormalizedTasks = Pick<TaskLifecycle, 'projectID' | 'taskId'> & Task

export const $normalizeTasks = combine([$tasks, taskLifecycleState.$lifecycle], ([meta, tasks]) => {
  return tasks.reduce<Record<Status, NormalizedTasks>>((acc, task) => {
    const { status, ...idx } = task
    const taskInfo = { ...idx, ...meta[task.taskId] }

    return { ...acc, [status]: taskInfo }
  }, {} as never)
})

export const $boards = $normalizeTasks.map((lifecycle) => Object.keys(lifecycle) as Status[])
