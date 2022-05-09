import { combine, createStore, sample } from 'effector'
import { addTaskToLifecycleFx, loadTasksLifecycleFx, TaskLifecycle } from '~/shared/api/requests'
import { createTaskLifeCycleState } from './library'

export const taskLifecycleState = createTaskLifeCycleState()

sample({
  clock: loadTasksLifecycleFx.doneData,
  target: taskLifecycleState.initItems,
})

sample({
  clock: addTaskToLifecycleFx.doneData,
  target: taskLifecycleState.addItems,
})

export const $idleTasks = createStore<TaskLifecycle[]>([]).on(
  taskLifecycleState.$lifecycle,
  (_, tasks) => tasks.filter((task) => task.status === 'idle')
)

export const $inProcessingTasks = createStore<TaskLifecycle[]>([]).on(
  taskLifecycleState.$lifecycle,
  (_, tasks) => tasks.filter((task) => task.status === 'take')
)

export const $completedTasks = createStore<TaskLifecycle[]>([]).on(
  taskLifecycleState.$lifecycle,
  (_, tasks) => tasks.filter((task) => task.status === 'resolve')
)

export const $taskLifecycle = combine({
  idle: $idleTasks,
  take: $inProcessingTasks,
  resolve: $completedTasks,
})
