import type { Task, TaskLifecycle } from '~/shared/api/requests'

export type NormalizedTasks = Pick<TaskLifecycle, 'projectID' | 'taskId'> & Task
