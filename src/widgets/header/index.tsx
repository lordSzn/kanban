import { Grid, Text } from '@geist-ui/core'
import { ApplicationMenu } from '@icon-park/react'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React from 'react'
import { $visibleDraftProject, closeCreateProject } from '~/entities/project'
import { ProjectCreate, SubmittedProject } from '~/entities/project/ui'
import { UserCard } from '~/entities/user/ui'
import { SearchBar } from '~/features/search-bar/ui'

export const Header = () => {
  const visibleModel = useStore($visibleDraftProject)
  return (
    <HeaderContainer>
      <Grid.Container height="100%" justify="center" alignItems="center">
        <Grid xs={13} height="100%" margin="0">
          <ButtonMenu>
            <ApplicationMenu />
          </ButtonMenu>
          <Text h2>Mirio</Text>
        </Grid>
        <Grid xs={6} justify="space-between">
          <SearchBar />
          <SubmittedProject />
        </Grid>
        <Grid xs={3} pl={3.45}>
          <UserCard fullname="robert kuzhin" />
        </Grid>
      </Grid.Container>
      <ProjectCreate visible={visibleModel} close={closeCreateProject} />
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
  box-shadow: 0 0 15px 0 rgb(0 0 0 / 10%);
  height: 60px;
`
