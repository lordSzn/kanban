import { createEvent, sample } from 'effector'
import {
  $isAuthenticated,
  authWithGithub,
  authWithGoogleFx,
  authWithTwitter,
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

sample({
  clock: loginRouter.opened,
  filter: $isAuthenticated.map(Boolean),
  target: WorkspacePage.workspaceRouter.navigate.prepend(() => ({
    params: {},
    query: {},
  })),
})

sample({
  clock: [
    authWithTwitter.doneData,
    authWithGithub.doneData,
    authWithGoogleFx.doneData,
  ],
  target: WorkspacePage.workspaceRouter.navigate.prepend(() => ({
    params: {},
    query: {},
  })),
})
