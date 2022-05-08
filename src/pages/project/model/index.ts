import { sample } from 'effector'
import { pending } from 'patronum'
import { loadTasksFx, loadTasksLifecycleFx } from '~/shared/api/requests'
import { projectRoute } from '../route'

export const $pending = pending({ effects: [loadTasksLifecycleFx] })

sample({
  clock: projectRoute.opened,
  filter: projectRoute.$isOpened,
  fn: (route) => ({ projectID: route.params.id }),
  target: [loadTasksLifecycleFx, loadTasksFx],
})
