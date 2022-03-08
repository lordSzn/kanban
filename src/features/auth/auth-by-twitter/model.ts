import { attach, createEvent, createStore, sample } from 'effector'
import { TwitterAuthProvider } from 'firebase/auth'
import { $currentUser } from '~/entities/session'
import { baseAuthenticateFx } from '~/shared/api/requests'

export const twitterAuthClicked = createEvent()

export const twitterProvider = createStore(new TwitterAuthProvider())

export const authenticationWithTwitterFx = attach({
  source: twitterProvider,
  effect: baseAuthenticateFx,
  mapParams: (_, provider) => ({ provider }),
})

sample({
  clock: twitterAuthClicked,
  target: authenticationWithTwitterFx,
})

$currentUser.on(authenticationWithTwitterFx.doneData, (_, user) => user)
