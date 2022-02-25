import { sample } from 'effector'
import { loadFavoritesProjectsFx, loadProjectsFx } from '~/shared/api/internal'
import { getFirestoreFx } from '~/shared/lib/firebase/firestore'
import { showMessage } from '~/shared/lib/toast'
import { workspaceRouter } from '../route'

export const $pending = loadProjectsFx.pending

sample({
  clock: workspaceRouter.opened,
  fn: () => undefined,
  target: getFirestoreFx,
})

sample({
  clock: getFirestoreFx.doneData,
  filter: Boolean,
  target: [loadProjectsFx, loadFavoritesProjectsFx],
})

showMessage({
  when: workspaceRouter.opened,
  toast: () => ({
    type: 'success',
    text: 'Welcome to workspace page',
    delay: 3000,
  }),
})
