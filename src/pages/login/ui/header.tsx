import { Link, Text, useTheme } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React from 'react'
import { ThemeChoice } from '~/features/theme/ui'

export const Header = () => {
  const theme = useTheme()
  return (
    <HeaderWrapper data-theme={theme.type}>
      <HeaderContainer>
        <Text h2>Mirio</Text>
        <Container>
          <div>
            <Link mr={1.2} rel="noopener" target="_blank" href="https://github.com/lordSzn">
              Contact
            </Link>
            <Link mr={1.2}>Sign Up</Link>
            <ThemeChoice />
          </div>
        </Container>
      </HeaderContainer>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 4rem;
  width: 100%;

  &[data-theme='light'] {
    box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  }

  &[data-theme='dark'] {
    box-shadow: 0 0 0 1px #333;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 1048px;
  width: 100%;
  margin: 0 auto;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
