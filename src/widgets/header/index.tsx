import { Grid, Popover, Text, useTheme } from '@geist-ui/core'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React, { FC, ReactNode } from 'react'
import { $visibleDraftProject, hideCreationForm } from '~/entities/project'
import { ProjectCreationForm, SubmittedProject } from '~/entities/project/ui'
import { UserCard } from '~/entities/user/ui'
import { SearchBar } from '~/features/search-bar/ui'

interface Props {
  settings: ReactNode
}

export const Header: FC<Props> = ({ settings }) => {
  const visibleModal = useStore($visibleDraftProject)
  const theme = useTheme()
  return (
    <HeaderContainer data-theme={theme.type}>
      <Grid.Container justify="center" alignItems="center">
        <Grid md={10} sm={8}>
          <Text h2>Mirio</Text>
        </Grid>
        <Grid md={10} sm={12} alignItems="center" justify="flex-end">
          <SubmittedProject />
          <SearchBar />
          <Popover content={settings} disableItemsAutoClose hideArrow>
            <UserCard />
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
