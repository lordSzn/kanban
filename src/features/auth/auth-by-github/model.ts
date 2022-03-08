import { attach, createEvent, createStore, sample } from 'effector'
import { GithubAuthProvider } from 'firebase/auth'
import { baseAuthenticateFx } from '~/shared/api/requests/index'

export const githubAuthClicked = createEvent()

export const githubProvider = createStore(new GithubAuthProvider())

export const authenticationWithGithubFx = attach({
  source: githubProvider,
  effect: baseAuthenticateFx,
  mapParams: (_, provider) => ({ provider }),
})

sample({
  clock: githubAuthClicked,
  target: authenticationWithGithubFx,
})
