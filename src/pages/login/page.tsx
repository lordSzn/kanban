import { Text, useTheme, Link, Button, Spacer, Divider } from '@geist-ui/core'
import { Github, Globe, Twitter } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import React from 'react'
import { ThemeChoice } from '~/features/theme/ui'
import {
  githubAuthClicked,
  googleAuthClicked,
  twitterAuthClicked,
} from './model'

export const Login = () => {
  const theme = useTheme()
  return (
    <>
      <Header data-theme={theme.type}>
        <Container>
          <Text h2>Mirio</Text>
          <div>
            <Link
              mr={1.2}
              rel="noopener"
              target="_blank"
              href="https://github.com/lordSzn"
            >
              Contact
            </Link>
            <Link mr={1.2}>Sign Up</Link>
            <ThemeChoice />
          </div>
        </Container>
      </Header>
      <Content>
        <LoginForm>
          <Text h1>Log in to Mirio</Text>
          <Button
            icon={<Globe />}
            shadow
            width="100%"
            mb={0.89}
            onClick={() => googleAuthClicked()}
          >
            Continue with google
          </Button>
          <Button
            icon={<Twitter />}
            mb={0.89}
            shadow
            type="success"
            width="100%"
            onClick={() => twitterAuthClicked()}
          >
            Twitter
          </Button>
          <Button
            icon={<Github />}
            shadow
            type="secondary"
            width="100%"
            onClick={() => githubAuthClicked()}
          >
            Continue with github
          </Button>
          <Spacer h={1.6} />
          <Divider />
          <Spacer h={1.2} />
          <Link color underline>
            Continue with email
          </Link>
        </LoginForm>
      </Content>
    </>
  )
}

const Header = styled.header`
  width: 100%;
  height: 4rem;

  &[data-theme='light'] {
    box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  }

  &[data-theme='dark'] {
    box-shadow: 0 0 0 1px #333;
  }
`

const Container = styled.div`
  max-width: 1048px;
  margin: 0 auto;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Content = styled.section`
  height: 100vh;

  display: flex;
  justify-content: center;

  margin-top: 10rem;
`

const LoginForm = styled.form`
  max-width: 60rem;

  text-align: center;
`
