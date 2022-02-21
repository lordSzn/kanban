import { createEffect, createStore, sample } from 'effector'
import { getFirestore } from 'firebase/firestore'
import { loadProjectsFx } from '~/shared/api/internal'
import { workspaceRouter } from '../route'

export const getFirestoreFx = createEffect(getFirestore)
export const $pending = createStore(false)
  .on(getFirestoreFx, () => true)
  .on(loadProjectsFx.finally, () => false)

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
