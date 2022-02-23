import { reflect } from '@effector/reflect'
import { Grid, Tabs, Text } from '@geist-ui/core'
import React from 'react'
import { $activeProjects } from '~/entities/project'
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
            HTTP is stateless, but not session less.
          </Tabs.Item>
          <Tabs.Item label="all" value="2">
            Between the Web browser and the server, numerous computers and
            machines relay the HTTP messages.
          </Tabs.Item>
          <Tabs.Item label="favorites" value="3">
            Between the Web browser and the server, numerous computers and
            machines relay the HTTP messages.
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
