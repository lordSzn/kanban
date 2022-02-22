import { sample } from 'effector'
import { loadProjectsFx } from '~/shared/api/internal'
import { getFirestoreFx } from '~/shared/lib/firebase/firestore'
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
  target: loadProjectsFx,
})
