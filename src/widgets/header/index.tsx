import { Grid, Popover, Text } from '@geist-ui/core'
import { Settings, LogOut } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React from 'react'
import { $visibleDraftProject, hideCreationForm } from '~/entities/project'
import { ProjectCreationForm, SubmittedProject } from '~/entities/project/ui'
import { UserCard, UserSettings } from '~/entities/user/ui'
import { SearchBar } from '~/features/search-bar/ui'
import { $theme, themeToggled } from '~/features/theme'
import { SwitchTheme } from '~/features/theme/ui'
import { PopoverAction } from '~/shared/ui'

export const Header = () => {
  const visibleModal = useStore($visibleDraftProject)
  const theme = useStore($theme)
  return (
    <HeaderContainer data-theme={theme}>
      <Grid.Container justify="center" alignItems="center">
        <Grid md={10} sm={8}>
          <Text h2>Mirio</Text>
        </Grid>
        <Grid md={10} sm={12} alignItems="center" justify="flex-end">
          <SubmittedProject />
          <SearchBar />
          <Popover
            content={
              <UserSettings
                theme={<SwitchTheme toggleTheme={themeToggled} />}
                signOut={
                  <PopoverAction text="Sign Out" icon={<LogOut size={15} />} />
                }
                setup={
                  <PopoverAction text="  Account setup" icon={<Settings />} />
                }
              />
            }
            disableItemsAutoClose
            hideArrow
          >
            <UserCard fullname="robert kuzhin" />
          </Popover>
        </Grid>
      </Grid.Container>
      <ProjectCreationForm visible={visibleModal} close={hideCreationForm} />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;

  &[data-theme='light'] {
    box-shadow: 0 0 15px 0 rgb(0 0 0 / 10%);
  }

  &[data-theme='dark'] {
    box-shadow: 0 0 0 1px #333;
  }
`
