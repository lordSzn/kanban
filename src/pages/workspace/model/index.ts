import { sample } from 'effector'
import { every } from 'patronum'
import { redirectSessionFailure, checkAuthenticated } from '~/entities/session'
import { loadFavoritesProjectsFx, loadProjectsFx } from '~/shared/api/requests'
import { workspaceRoute } from '../route'

checkAuthenticated({
  when: workspaceRoute.opened,
  if: 'anonymous',
  then: redirectSessionFailure,
})

export const $pending = every({
  stores: [loadProjectsFx.pending, loadFavoritesProjectsFx.pending],
  predicate: true,
})

sample({
  clock: workspaceRoute.opened,
  target: [loadProjectsFx, loadFavoritesProjectsFx],
})
