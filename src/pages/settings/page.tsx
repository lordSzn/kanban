import { GeistUIThemes, Grid, useTheme } from '@geist-ui/core'
import { CornerUpLeft } from '@icon-park/react'
import { styled } from '@linaria/react'
import React from 'react'
import { UserEditForm } from '~/features/user/edit/ui/organisms'
import { paths } from '~/shared/lib/paths'
import { CustomLink } from '~/shared/ui'
import { SettingsMenu } from './ui/settings-menu'

export const Settings = () => {
  const theme = useTheme()
  return (
    <Grid.Container height="100vh">
      <Grid xs={4} width="100%">
        <LeftMenu theme={theme} data-theme={theme.type}>
          <GoBackLink iconLeft={<CornerUpLeft />} to={paths.workspace()}>
            Settings
          </GoBackLink>
          <CollapseBar>
            <SettingsMenu />
          </CollapseBar>
        </LeftMenu>
      </Grid>
      <Grid xs={20} justify="center">
        <Main>
          <UserEditForm />
        </Main>
      </Grid>
    </Grid.Container>
  )
}

const GoBackLink = styled(CustomLink)`
  font-size: 1.2rem;
`

const LeftMenu = styled.aside<{ theme: GeistUIThemes }>`
  padding: 20px 37px 0 37px;
  width: 100%;

  border-right: 1px solid ${({ theme }) => theme.palette.border};
`

const Main = styled.section`
  padding-top: 4rem;

  max-width: 37rem;
  width: 100%;
`

const CollapseBar = styled.nav`
  margin-top: 3rem;
`
