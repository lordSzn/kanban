import { variant } from '@effector/reflect'
import { Grid, Loading } from '@geist-ui/core'
import { useStore } from 'effector-react'
import React from 'react'
import { $boards, $normalizeTasks } from '~/features/control-task-lifecycle'
import { Board } from '~/features/control-task-lifecycle/ui'
import { BoardsBaseStruts } from '~/features/control-task-lifecycle/ui/organisms/board'
import { BaseTemplate } from '~/shared/ui'
import { $pending } from './model'
import { Header } from './ui/header'

const Content = variant({
  source: $pending.map((pending) => (pending ? 'loading' : 'started')),
  cases: {
    loading: () => <Loading />,
    started: () => <Boards />,
  },
})

export const Project = () => {
  return (
    <BaseTemplate header={<Header />}>
      <Content />
    </BaseTemplate>
  )
}

export const Boards = () => {
  return (
    <Grid.Container gap={10} justify="center" height="100px">
      <BoardsBaseStruts />
    </Grid.Container>
  )
}
