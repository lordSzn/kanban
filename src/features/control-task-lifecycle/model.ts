import { combine, createEvent, createStore } from 'effector'
import { $tasks } from '~/entities/task'

export const takeTask = createEvent<{ taskID: string }>()
export const resolveTask = createEvent<{ taskID: string }>()

