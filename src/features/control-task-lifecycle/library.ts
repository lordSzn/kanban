import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { attach, createEvent, createStore, sample } from 'effector'
import { splitMap } from 'patronum'
import type { Status, Task, TaskLifecycle } from '~/shared/api/requests'
import { NormalizedTasks } from './types'

export const changeTaskStatus = (
  tasks: TaskLifecycle[],
  id: string,
  status: Status
): TaskLifecycle[] => {
  return tasks.map((task) => (task.taskId === id ? { ...task, status } : task))
}

export const createTasksStructure = (meta: Record<string, Task>, tasks: TaskLifecycle[]) => {
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
}

export type TaskMoveitem = Pick<TaskLifecycle, 'taskId' | 'status'> & { target: Status }
export type ID = Pick<TaskLifecycle, 'taskId'>

export const createTaskLifeCycleState = () => {
  const addItems = createEvent<TaskLifecycle>()
  const initItems = createEvent<TaskLifecycle[]>()
  const removeItem = createEvent<ID>()

  const $lifecycle = createStore<TaskLifecycle[]>([])
    .on(initItems, (_, tasks) => tasks)
    .on(addItems, (prevTasks, tasks) => prevTasks.concat(tasks))
    .on(removeItem, (tasks, { taskId }) => tasks.filter((task) => task.taskId !== taskId))

  const taskMoved = createEvent<TaskMoveitem>()

  const takeTaskFx = attach({
    source: $lifecycle,
    effect: (lifecycle, { taskId }: ID) => {
      return changeTaskStatus(lifecycle, taskId, 'take')
    },
  })

  const resolveTaskFx = attach({
    source: $lifecycle,
    effect: (lifecycle, { taskId }: ID) => {
      return changeTaskStatus(lifecycle, taskId, 'resolve')
    },
  })

  const { take, resolve } = splitMap({
    source: taskMoved,
    cases: {
      take: (moveitem) => {
        if (moveitem.status === 'idle' && moveitem.target === 'take') {
          return { taskId: moveitem.taskId } as ID
        }
      },
      resolve: (moveitem) => {
        if (moveitem.status === 'take' && moveitem.target === 'resolve') {
          return { taskId: moveitem.taskId } as ID
        }
      },
    },
  })

  sample({
    clock: take,
    target: takeTaskFx,
  })

  sample({
    source: resolve,
    target: resolveTaskFx,
  })

  sample({
    clock: [takeTaskFx.doneData, resolveTaskFx.doneData],
    target: $lifecycle,
  })

  const dragStarted = createEvent<DragStartEvent>()
  const dragOver = createEvent<DragOverEvent>()
  const dragEnded = createEvent<DragEndEvent>()

  const $activeItemId = createStore<string | null>(null).reset(dragEnded)

  sample({
    clock: dragStarted,
    fn: (e) => e.active.id,
    target: $activeItemId,
  })

  return {
    addItems,
    initItems,
    taskMoved,
    dragEnded,
    dragOver,
    $lifecycle,
    removeItem,
    dragStarted,
    $activeItemId,
  }
}
