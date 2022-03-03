import { Grid, Text } from '@geist-ui/core'
import { ApplicationMenu } from '@icon-park/react'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React from 'react'
import { $visibleDraftProject, hideCreationForm } from '~/entities/project'
import { ProjectCreationForm, SubmittedProject } from '~/entities/project/ui'
import { UserCard } from '~/entities/user/ui'
import { SearchBar } from '~/features/search-bar/ui'
import { $theme } from '~/features/theme'
import { SwitchTheme } from '~/features/theme/ui'

export const Header = () => {
  const visibleModal = useStore($visibleDraftProject)
  const theme = useStore($theme)
  return (
    <HeaderContainer data-theme={theme}>
      <Grid.Container height="100%" justify="center" alignItems="center">
        <Grid xs={13} height="100%" margin="0">
          <ButtonMenu>
            <ApplicationMenu />
          </ButtonMenu>
          <Text h2>Mirio</Text>
        </Grid>
        <Grid xs={6} justify="space-between">
          <SubmittedProject />
          <SearchBar />
          <SwitchTheme />
        </Grid>
        <Grid xs={3} pl={3.45}>
          <UserCard fullname="robert kuzhin" />
        </Grid>
      </Grid.Container>
      <ProjectCreationForm visible={visibleModal} close={hideCreationForm} />
    </HeaderContainer>
  )
}

const ButtonMenu = styled.button`
  cursor: pointer;
  margin-right: 1rem;
  background: transparent;
  padding: 0;
  outline: none;
  border: none;
`

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
