import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
  Unit,
} from 'effector'
import { persist } from 'effector-storage/local'
import { getAuth } from 'firebase/auth'
import type { User } from '~/shared/api/requests'

export const sessionGetFx = createEffect({
  handler: async () => {
    const user = await getAuth().currentUser
    return user
  },
})

export const sessionDeleteFx = createEffect({
  handler: async () => {
    await getAuth().signOut
  },
})

export const logout = createEvent()

export const $currentUser = createStore<User | null>(null).reset(logout)
export const $isAuthenticated = $currentUser.map(Boolean)

persist({
  store: $currentUser,
  key: 'current-user',
})

sample({
  clock: logout,
  filter: sessionDeleteFx.pending.map((pending) => !pending),
  target: sessionDeleteFx,
})

export const checkAuthenticated = <T>(config: {
  when: Unit<T>
  if: 'authorized' | 'anonymous'
  then: Unit<void>
  else?: Unit<void>
}) => {
  const currentUserGetFx = attach({ effect: sessionGetFx })

  const elseLogic = config.else ?? createEvent()

  const checkIsAuthenticated = config.if === 'authorized'

  if (checkIsAuthenticated) {
    sample({
      clock: config.when,
      filter: $isAuthenticated,
      target: config.then,
    })
  }

  sample({
    clock: config.when,
    filter: $isAuthenticated.map((is) => !is),
    target: currentUserGetFx,
  })

  sample({
    clock: currentUserGetFx.doneData,
    filter: (user) => user !== null,
    target: config.then,
  })

  sample({
    clock: currentUserGetFx.doneData,
    filter: (user) => user === null,
    target: elseLogic,
  })
}
