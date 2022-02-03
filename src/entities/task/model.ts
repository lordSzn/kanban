import { createEvent, createStore } from 'effector'

export interface Task {
  taskID: string
  projectID: string
}

export interface TaskInfo {
  taskID: string
  title: string
  description: string
}

export type CreatedTask = Pick<TaskInfo, 'title' | 'description'>

export const addTask = createEvent<CreatedTask>()
export const taskAdded = createEvent<TaskInfo>()

export const updateTaskInfo = createEvent<{ TaskID: string }>()

export const $tasks = createStore<Task[]>([])
export const $taskInfo = createStore<TaskInfo>({} as TaskInfo)
