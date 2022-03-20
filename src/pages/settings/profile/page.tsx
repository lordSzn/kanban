import { Button, Drawer, GeistUIThemes, useMediaQuery, useTheme } from '@geist-ui/core'
import { Menu } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React, { useCallback, useState } from 'react'
import { checkAuthenticated, redirectSessionFailure } from '~/entities/session'
import { $theme } from '~/features/theme'
import { userEditRoute } from '~/features/user/edit'
import { UserEditForm } from '~/features/user/edit/ui'
import { Sidebar } from '~/widgets/sidebar'
import { SettingsMenu } from '~/widgets/sidebar/settings-menu'

checkAuthenticated({
  when: userEditRoute.opened,
  if: 'anonymous',
  then: redirectSessionFailure,
})

export const Settings = () => {
  // @fix 1023px media
  const tableScreen = useMediaQuery('md', { match: 'down' })
  return (
    <Container>
      <SidebarColumn>
        <Sidebar />
      </SidebarColumn>
      <ContentColumn>
        <MainContent>
          {tableScreen && <HeaderBar />}
          <UserEditForm />
        </MainContent>
      </ContentColumn>
    </Container>
  )
}

export const HeaderBar = () => {
  const type = useStore($theme)
  const theme = useTheme()
  const [visible, setVisible] = useState(false)

  const toggle = useCallback(() => {
    setVisible((current) => !current)
  }, [])

  const hide = useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <Header theme={theme}>
      <HeaderContainer>
        <ButtonStyled icon={<Menu size={25} />} type="abort" auto onClick={toggle} />
      </HeaderContainer>
      <Drawer width="75%" visible={visible} onClose={hide} placement="left">
        <Drawer.Content>
          <SettingsMenu theme={type} />
        </Drawer.Content>
      </Drawer>
    </Header>
  )
}
const Container = styled.div`
  display: flex;

  height: 100vh;
  width: 100%;
`

const SidebarColumn = styled.div`
  max-width: 15%;
  width: 100%;

  flex-basis: 25%;
  display: inherit;

  @media (max-width: 1023px) {
    position: absolute;
    top: 0;
    left: -500px;
  }
`

const ContentColumn = styled.div`
  max-width: 85%;
  width: 100%;

  flex-basis: 85%;
  display: inherit;

  @media (max-width: 1023px) {
    max-width: none;
    flex-basis: auto;
  }
`

const MainContent = styled.main`
  width: 100%;

  & > form {
    margin: 5rem auto 0;
    max-width: 42rem;

    @media (max-width: 1023px) {
      max-width: none;
      padding: 0 2rem;
    }
  }
`

const Header = styled.header<{ theme: GeistUIThemes }>`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 3rem;

  border-bottom: 1px solid ${({ theme }) => theme.palette.border};
`

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  padding-left: 0.7rem;
`

const ButtonStyled = styled(Button)``
