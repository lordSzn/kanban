import { combine, sample } from 'effector'
import { redirectSessionFailure, checkAuthenticated } from '~/entities/session'
import { loadFavoritesProjectsFx, loadProjectsFx } from '~/shared/api/requests'
import { showMessage } from '~/shared/lib/toast'
import { workspaceRoute } from '../route'

checkAuthenticated({
  when: workspaceRoute.opened,
  if: 'anonymous',
  then: redirectSessionFailure,
})

export const $pending = combine(
  [loadProjectsFx.pending, loadFavoritesProjectsFx.pending],
  ([loadProjects, loadFavorites]) => loadProjects && loadFavorites
)

sample({
  clock: workspaceRoute.opened,
  target: [loadProjectsFx, loadFavoritesProjectsFx],
})

showMessage({
  when: workspaceRoute.opened,
  toast: () => ({
    type: 'success',
    text: 'Welcome to workspace page',
    delay: 3000,
  }),
})
