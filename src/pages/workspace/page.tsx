import { Grid, Loading, Text } from '@geist-ui/core'
import { useStore } from 'effector-react'
import React from 'react'
import { ProjectList } from '~/entities/project/ui'
import { Header } from '../../widgets/header'
import { $pending } from './model'

export const Workspace = () => {
  const loading = useStore($pending)
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={24} height="80px">
        <Header />
      </Grid>
      <Grid xs={20} height="63px">
        <Text h3>Your works</Text>
      </Grid>
      <Grid xs={20} height="63px">
        {loading ? <Loading>Loading</Loading> : <ProjectList />}
      </Grid>
    </Grid.Container>
  )
}
