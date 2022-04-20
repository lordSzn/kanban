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
  const structure: Record<string, NormalizedTasks[]> = {}

  for (const task of tasks) {
    const { status, ...ids } = task
    const taskMeta = { ...ids, ...meta[task.taskId] }

    if (status in structure) {
      structure[status].push(taskMeta)
    } else {
      structure[status] = []
      structure[status].push(taskMeta)
    }
  }

  return structure as Record<Status, NormalizedTasks[]>
})

export const $boards = $normalizeTasks.map((lifecycle) => Object.keys(lifecycle) as Status[])
