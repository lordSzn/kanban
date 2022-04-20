import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { attach, createEvent, createStore, sample } from 'effector'
import { splitMap } from 'patronum'
import type { Status, TaskLifecycle } from '~/shared/api/requests'

export const changeTaskStatus = (
  tasks: TaskLifecycle[],
  id: string,
  status: Status
): TaskLifecycle[] => {
  return tasks.map((task) => (task.taskId === id ? { ...task, status } : task))
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

  return {
    addItems,
    initItems,
    taskMoved,
    dragEnded,
    dragOver,
    $lifecycle,
    removeItem,
    dragStarted,
  }
}
