import { reflect } from '@effector/reflect'
import { Text, Link, Spacer, Divider } from '@geist-ui/core'
import { Github, Globe, Twitter } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import React from 'react'
import { SubmittedProvider } from '~/features/session/ui'
import {
  githubAuthClicked,
  googleAuthClicked,
  twitterAuthClicked,
} from './model'
import { ContentCentred, Header } from './ui'

export const Login = () => {
  return (
    <>
      <Header />
      <ContentCentred>
        <Form>
          <Text h1>Log in to Mirio</Text>
          <GoogleSubmit />
          <TwitterSubmit />
          <GithubSubmit />
          <Spacer h={1.6} />
          <Divider />
          <Spacer h={1.2} />
          <Link color underline>
            Continue with email
          </Link>
        </Form>
      </ContentCentred>
    </>
  )
}

const Form = styled.form`
  max-width: 60rem;

  text-align: center;
`

const GoogleSubmit = reflect({
  view: SubmittedProvider,
  bind: {
    label: 'Continue with google',
    icon: <Globe />,
    onClick: () => googleAuthClicked(),
  },
})

const TwitterSubmit = reflect({
  view: SubmittedProvider,
  bind: {
    type: 'success',
    label: 'Twitter',
    icon: <Twitter />,
    onClick: () => twitterAuthClicked(),
  },
})

const GithubSubmit = reflect({
  view: SubmittedProvider,
  bind: {
    type: 'secondary',
    label: 'Continue with github',
    icon: <Github />,
    onClick: () => githubAuthClicked(),
  },
})
