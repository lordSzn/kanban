import { GeistUIThemes, Grid, Link, Text, useTheme } from '@geist-ui/core'
import { User } from '@geist-ui/icons'
import { CornerUpLeft } from '@icon-park/react'
import { styled } from '@linaria/react'
import React from 'react'
import { paths } from '~/shared/lib/paths'
import { CustomLink } from '~/shared/ui'

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
            <SettingsLabel>
              <User size={23} />
              <Text ml={0.35}>Account</Text>
            </SettingsLabel>
            <SettingItem>
              <Link>Profile</Link>
            </SettingItem>
            <SettingItem>
              <Link>Preferences</Link>
            </SettingItem>
            <SettingItem>
              <Link>Notifications</Link>
            </SettingItem>
          </CollapseBar>
        </LeftMenu>
      </Grid>
      <Grid xs={20} justify="center">
        <Main>Example geist and effector app!!!</Main>
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
`

const CollapseBar = styled.nav`
  margin-top: 3rem;
`

const SettingsLabel = styled.div`
  display: flex;
  align-items: center;

  height: 2rem;
`

const SettingItem = styled.div`
  margin: 1px;
  padding: 0.5rem 0 0.5rem 1.8rem;
  border-radius: 7px;

  cursor: pointer;
  transition: background 0.2s cubic-bezier(0.33, 0.96, 0.49, 1.01);

  &:hover {
    background-color: rgb(240, 243, 249);
  }
`
