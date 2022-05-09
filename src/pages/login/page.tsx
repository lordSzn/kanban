import { reflect } from '@effector/reflect'
import { Text, Link, Spacer, Divider } from '@geist-ui/core'
import { Github, Globe, Twitter } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import { sample } from 'effector'
import React from 'react'
import { checkAuthenticated } from '~/entities/session'
import { authenticationWithGithubFx, githubAuthClicked } from '~/features/auth/auth-by-github'
import { authenticationWithGoogleFx, googleAuthClicked } from '~/features/auth/auth-by-google'
import { authenticationWithTwitterFx, twitterAuthClicked } from '~/features/auth/auth-by-twitter'
import { WorkspacePage } from '~/pages'
import { ButtonControl, PageContentCentred } from '~/shared/ui'
import { loginRoute } from './route'
import { Header } from './ui'

checkAuthenticated({
  when: loginRoute.opened,
  if: 'authorized',
  then: WorkspacePage.workspaceRoute.open,
})

sample({
  clock: [
    authenticationWithGithubFx.done,
    authenticationWithTwitterFx.done,
    authenticationWithGoogleFx.done,
  ],
  target: WorkspacePage.workspaceRoute.open,
})

export const Login = () => {
  return (
    <PageContentCentred header={<Header />}>
      <FormSubmitted>
        <Text h2>Log in to Mirio</Text>
        <GoogleSubmit />
        <TwitterSubmit />
        <GithubSubmit />
        <Spacer h={1.6} />
        <Divider />
        <Spacer h={1.2} />
        <Link color underline>
          Continue with email
        </Link>
      </FormSubmitted>
    </PageContentCentred>
  )
}

const FormSubmitted = styled.form`
  max-width: 28rem;
  margin: 10rem auto 0;
  text-align: center;
`

const GoogleSubmit = reflect({
  view: ButtonControl,
  bind: {
    label: 'Continue with google',
    icon: <Globe />,
    onClick: () => googleAuthClicked(),
  },
})

const TwitterSubmit = reflect({
  view: ButtonControl,
  bind: {
    type: 'success',
    label: 'Twitter',
    icon: <Twitter />,
    onClick: () => twitterAuthClicked(),
  },
})

const GithubSubmit = reflect({
  view: ButtonControl,
  bind: {
    type: 'secondary',
    label: 'Continue with github',
    icon: <Github />,
    onClick: () => githubAuthClicked(),
  },
})
