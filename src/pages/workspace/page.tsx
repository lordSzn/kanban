import { Grid, Loading, Tabs, Text } from '@geist-ui/core'
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
      <Grid xs={20}>
        {loading ? <Loading>Loading</Loading> : <ProjectList />}
      </Grid>
      <Grid xs={20} height="63px">
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
