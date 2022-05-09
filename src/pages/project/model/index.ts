import { sample } from 'effector'
import { pending } from 'patronum'
import {
  addTaskFx,
  addTaskToLifecycleFx,
  loadTasksFx,
  loadTasksLifecycleFx,
  Status,
} from '~/shared/api/requests'
import { projectRoute } from '../route'

export const $pending = pending({ effects: [loadTasksLifecycleFx] })

sample({
  clock: projectRoute.opened,
  filter: projectRoute.$isOpened,
  fn: (route) => ({ projectID: route.params.id }),
  target: [loadTasksLifecycleFx, loadTasksFx],
})

sample({
  clock: addTaskFx.doneData,
  source: projectRoute.$params,
  filter: Boolean,
  fn: (params, taskId) => ({ projectID: params.id, status: 'idle' as Status, taskId }),
  target: addTaskToLifecycleFx,
})
