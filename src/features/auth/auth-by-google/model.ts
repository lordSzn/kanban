import { attach, createEvent, createStore, sample } from 'effector'
import { GoogleAuthProvider } from 'firebase/auth'
import { $currentUser } from '~/entities/session'
import { baseAuthenticateFx } from '~/shared/api/requests'

export const googleAuthClicked = createEvent()

export const googleProvider = createStore(new GoogleAuthProvider())

export const authenticationWithGoogleFx = attach({
  source: googleProvider,
  effect: baseAuthenticateFx,
  mapParams: (_, provider) => ({ provider }),
})

sample({
  clock: googleAuthClicked,
  target: authenticationWithGoogleFx,
})

$currentUser.on(authenticationWithGoogleFx.doneData, (_, user) => user)
