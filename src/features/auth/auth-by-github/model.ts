import { attach, createEvent, createStore } from 'effector'
import { GithubAuthProvider } from 'firebase/auth'
import { baseAuthenticateFx } from '~/shared/api/requests/index'

export const githubAuthClicked = createEvent()

export const githubProvider = createStore(new GithubAuthProvider())

export const AuthenticationWithGithubFx = attach({
  source: githubProvider,
  effect: baseAuthenticateFx,
  mapParams: (_, provider) => ({ provider }),
})
