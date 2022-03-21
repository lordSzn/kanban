import { Button, GeistUIThemes, useMediaQuery, useTheme } from '@geist-ui/core'
import { Menu, CornerUpLeft } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React from 'react'
import { $theme } from '~/features/theme'
import { paths } from '~/shared/lib/paths'
import { CustomLink } from '~/shared/ui'
import { SettingsMenu } from './settings-menu'

export const Sidebar = () => {
  const theme = useTheme()
  const type = useStore($theme)
  return (
    <>
      <LeftMenu theme={theme} data-theme={theme.type}>
        <GoBackLink iconLeft={<CornerUpLeft />} to={paths.workspace()}>
          Settings
        </GoBackLink>
        <CollapseBar>
          <SettingsMenu theme={type} />
        </CollapseBar>
      </LeftMenu>
    </>
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

const CollapseBar = styled.nav`
  margin-top: 3rem;
`
