import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
  Unit,
} from 'effector'
import {
  AuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
  UserCredential,
} from 'firebase/auth'
import { $user, User } from '~/entities/user'

export const baseAuthenticateFx = createEffect<
  { provider: AuthProvider },
  User
>({
  handler: async ({ provider }) => {
    const auth = getAuth()
    const answer: UserCredential = await signInWithPopup(auth, provider)
    const user = answer.user

    return {
      fullname: user.displayName || 'unknown',
      email: user.email,
      photoUrl: user.photoURL || '',
    }
  },
})

export const sessionDeleteFx = createEffect({
  handler: async () => {
    await getAuth().signOut
  },
})

export const sessionGetFx = createEffect<void, User>({
  handler: async () => {
    const user = await getAuth().currentUser

    if (user === null) {
      throw 'user is not authorized'
    }

    return {
      fullname: user.displayName || 'unknown',
      photoUrl: user.photoURL || '',
      email: user.email,
    }
  },
})

export const $sessionDeletePending = sessionDeleteFx.pending
export const $isAuthenticated = $user.map((user) => user !== null)

export const $providerGoogle = createStore(new GoogleAuthProvider())
export const $providerGithub = createStore(new GithubAuthProvider())
export const $providerTwitter = createStore(new TwitterAuthProvider())

export const authWithGoogleFx = attach({
  effect: baseAuthenticateFx,
  source: $providerGoogle,
  mapParams: (_, provider) => ({
    provider,
  }),
})

export const authWithGithub = attach({
  effect: baseAuthenticateFx,
  source: $providerGithub,
  mapParams: (_, provider) => ({
    provider,
  }),
})

export const authWithTwitter = attach({
  effect: baseAuthenticateFx,
  source: $providerTwitter,
  mapParams: (_, provider) => ({
    provider,
  }),
})

$user
  .on(
    [
      authWithGoogleFx.doneData,
      authWithGithub.doneData,
      authWithTwitter.doneData,
      sessionGetFx.doneData,
    ],
    (_, user) => user
  )
  .on(sessionDeleteFx, () => null)

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

  const $readiness = createStore(false)
  const $failure = createStore<Error | null>(null)

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

  $readiness.on(currentUserGetFx.done, () => true)
  $failure.on(currentUserGetFx.failData, (_, error) => error)

  sample({
    clock: currentUserGetFx.done,
    fn: () => ({}),
    target: doneLogic,
  })

  sample({
    clock: currentUserGetFx.fail,
    fn: () => ({}),
    target: failLogic,
  })

  return {
    $readiness,
    $failure,
  }
}
