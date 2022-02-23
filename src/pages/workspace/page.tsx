import { reflect } from '@effector/reflect'
import { Grid, Tabs, Text } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React from 'react'
import { $activeProjects, $importantList } from '~/entities/project'
import { ProjectList } from '~/entities/project/ui'
import { Header } from '../../widgets/header'
import { $pending } from './model'
import { ProjectsContent } from './ui/projects-content'

export const Workspace = () => {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={24} height="80px">
        <Header />
      </Grid>
      <Grid xs={20} height="63px">
        <Text h3>Your works</Text>
      </Grid>
      <Grid xs={20}>
        <ContentList />
      </Grid>
      <Grid xs={20}>
        <Tabs initialValue="1" width="100%">
          <Tabs.Item label="Finished" value="1">
            Empty
          </Tabs.Item>
          <Tabs.Item label="important" value="3">
            <ProjectsContainer>
              <FavoritesProjectsList />
            </ProjectsContainer>
          </Tabs.Item>
        </Tabs>
      </Grid>
    </Grid.Container>
  )
}

const ContentList = reflect({
  view: ProjectsContent,
  bind: {
    loading: $pending,
    projects: $activeProjects,
  },
})

const FavoritesProjectsList = reflect({
  view: ProjectList,
  bind: {
    projects: $importantList,
  },
})

const ProjectsContainer = styled.div`
  display: flex;
  align-items: center;
`
