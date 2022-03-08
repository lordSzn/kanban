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

export const $currentUser = createStore<User | null>(null)
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

export const checkAuthenticated = <T>({
  when,
  done,
  fail,
}: {
  when: Unit<T>
  done?: Unit<void>
  fail?: Unit<void>
}) => {
  const currentUserGetFx = attach({ effect: sessionGetFx })

  const failLogic = fail ?? createEvent()
  const doneLogic = done ?? createEvent()

  sample({
    clock: when,
    filter: $isAuthenticated.map((is) => !is),
    target: currentUserGetFx,
  })

  sample({
    clock: when,
    filter: $isAuthenticated.map((is) => is),
    target: doneLogic,
  })

  sample({
    clock: currentUserGetFx.done,
    target: doneLogic,
  })

  sample({
    clock: currentUserGetFx.fail,
    target: failLogic,
  })
}
