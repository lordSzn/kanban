import { createEvent, createStore } from 'effector'
import type { Task, TaskInfo } from '~/shared/api/internal'

export const addTask = createEvent<TaskInfo>()
export const taskAdded = createEvent<TaskInfo>()

export const updateTaskInfo = createEvent<{ taskID: string }>()

export const $tasks = createStore<Task[]>([])
export const $taskInfo = createStore<Record<string, TaskInfo>>({})
