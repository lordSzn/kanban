import { sample } from 'effector'
import { loadFavoritesProjectsFx, loadProjectsFx } from '~/shared/api/requests'
import { showMessage } from '~/shared/lib/toast'
import { workspaceRoute } from '../route'

export const $pending = loadProjectsFx.pending

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
