import { createEvent, sample } from 'effector'
import {
  authWithGithub,
  authWithGoogleFx,
  authWithTwitter,
  checkAuthenticated,
} from '~/features/session'
import { WorkspacePage } from '~/pages/workspace'
import { loginRouter } from '../route'

export const googleAuthClicked = createEvent()
export const githubAuthClicked = createEvent()
export const twitterAuthClicked = createEvent()

sample({
  clock: googleAuthClicked,
  target: authWithGoogleFx,
})

sample({
  clock: githubAuthClicked,
  target: authWithGithub,
})

sample({
  clock: twitterAuthClicked,
  target: authWithTwitter,
})

export const pageReady = checkAuthenticated({
  when: loginRouter.opened,
  done: WorkspacePage.workspaceRouter.navigate.prepend(() => ({
    params: {},
    query: {},
  })),
})

sample({
  clock: [authWithGoogleFx.done, authWithGithub.done, authWithTwitter.done],
  target: WorkspacePage.workspaceRouter.navigate.prepend(() => ({
    params: {},
    query: {},
  })),
})
