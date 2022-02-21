import { Grid } from '@geist-ui/core'
import React, { FC, ReactNode } from 'react'

interface Props {
  idle: ReactNode
  take: ReactNode
  resolve: ReactNode
}

export const GridBoards: FC<Props> = ({ idle, take, resolve }) => {
  return (
    <Grid.Container gap={2} justify="space-between" width="100%">
      <Grid xs={6}>{idle}</Grid>
      <Grid xs={6}>{take}</Grid>
      <Grid xs={6}>{resolve}</Grid>
    </Grid.Container>
  )
}
