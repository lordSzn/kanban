import { attach, createEvent, createStore } from 'effector'
import { TwitterAuthProvider } from 'firebase/auth'
import { baseAuthenticateFx } from '~/shared/api/requests'

export const twitterAuthClicked = createEvent()

export const twitterProvider = createStore(new TwitterAuthProvider())

export const AuthenticationWithTwitterFx = attach({
  source: twitterProvider,
  effect: baseAuthenticateFx,
  mapParams: (_, provider) => ({ provider }),
})
