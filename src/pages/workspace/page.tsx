import { reflect } from '@effector/reflect'
import { Grid, Tabs, Text } from '@geist-ui/core'
import React from 'react'
import {
  $activeProjects,
  $finishedProjects,
  $importantList,
} from '~/entities/project'
import { ProjectList } from '~/entities/project/ui'
import { Header } from '../../widgets/header'
import { $pending } from './model'

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
        <ActiveProjectsList />
      </Grid>
      <Grid xs={20}>
        <Tabs initialValue="1" width="100%">
          <Tabs.Item label="Finished" value="1">
            <FinishedProjects />
          </Tabs.Item>
          <Tabs.Item label="important" value="3">
            <FavoritesProjectsList />
          </Tabs.Item>
        </Tabs>
      </Grid>
    </Grid.Container>
  )
}

const FavoritesProjectsList = reflect({
  view: ProjectList,
  bind: {
    projects: $importantList,
    loading: $pending,
  },
})

const FinishedProjects = reflect({
  view: ProjectList,
  bind: {
    projects: $finishedProjects,
    loading: $pending,
  },
})

const ActiveProjectsList = reflect({
  view: ProjectList,
  bind: {
    projects: $activeProjects,
    loading: $pending,
  },
})
