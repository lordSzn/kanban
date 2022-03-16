import { createEffect, createEvent, createStore, sample, Unit } from 'effector'
import { persist } from 'effector-storage/local'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import type { User as FirebaseUser } from 'firebase/auth'
import type { User } from '~/shared/api/requests'
import { appStarted } from '~/shared/config/run-logic'

export const redirectSessionFailure = createEvent()

export const sessionUpdated = createEvent<FirebaseUser | null>()

export const sessionGetSuccess = createEvent<User>()
export const sessionFailure = createEvent()

export const subscribeSessionFx = createEffect({
  handler: async () => {
    return onAuthStateChanged(getAuth(), sessionUpdated)
  },
})

export const sessionDeleteFx = createEffect({
  handler: async () => {
    await getAuth().signOut()
  },
})

sample({
  clock: appStarted,
  target: subscribeSessionFx,
})

sample({
  clock: sessionUpdated,
  filter: Boolean,
  fn: (user) => ({
    fullname: user.displayName || 'user',
    email: user.email || '',
    photoUrl: user.photoURL || '',
    description: '',
  }),
  target: sessionGetSuccess,
})

sample({
  clock: sessionUpdated,
  filter: (session) => session === null,
  target: sessionFailure,
})

export const logout = createEvent()

export const $currentUser = createStore<User | null>(null)
  .on(sessionGetSuccess, (_, user) => user)
  .reset(sessionDeleteFx.done, sessionFailure)
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
  then: Unit<T | void>
  else?: Unit<T | void>
}) => {
  const elseLogic = config.else ?? createEvent()

  const checkIsAuthenticated = config.if === 'authorized'
  const checkIsAnonymous = !checkIsAuthenticated

  if (checkIsAuthenticated) {
    sample({
      source: config.when,
      filter: $isAuthenticated,
      fn: () => {},
      target: config.then,
    })

    sample({
      source: config.when,
      filter: $isAuthenticated.map((is) => !is),
      fn: () => {},
      target: elseLogic,
    })
  }

  if (checkIsAnonymous) {
    sample({
      source: config.when,
      filter: $isAuthenticated,
      fn: () => {},
      target: elseLogic,
    })

    sample({
      source: config.when,
      filter: $isAuthenticated.map((is) => !is),
      fn: () => {},
      target: config.then,
    })
  }
}
