import { attach, createEvent, createStore } from 'effector'
import { GoogleAuthProvider } from 'firebase/auth'
import { baseAuthenticateFx } from '~/shared/api/requests'

export const googleAuthClicked = createEvent()

export const googleProvider = createStore(new GoogleAuthProvider())

export const AuthenticationWithGoogleFx = attach({
  source: googleProvider,
  effect: baseAuthenticateFx,
  mapParams: (_, provider) => ({ provider }),
})
