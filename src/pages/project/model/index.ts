import { sample } from 'effector'
import { pending } from 'patronum'
import { checkAuthenticated, redirectSessionFailure } from '~/entities/session'
import {
  addTaskFx,
  addTaskToLifecycleFx,
  loadTasksFx,
  loadTasksLifecycleFx,
  Status,
} from '~/shared/api/requests'
import { projectRoute } from '../route'

export const $pending = pending({ effects: [loadTasksLifecycleFx] })

checkAuthenticated({
  when: projectRoute.opened,
  if: 'anonymous',
  then: redirectSessionFailure,
})

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
