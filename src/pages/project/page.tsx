import { variant } from '@effector/reflect'
import { Loading } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React from 'react'
import { TaskPreview } from '~/entities/task/ui'
import { BaseTemplate, GridBoards, PanelBoard } from '~/shared/ui'
import { $pending } from './model'
import { Header } from './ui/header'

export const Project = variant({
  source: $pending.map((pending) => (pending ? 'loading' : 'started')),
  cases: {
    loading: () => (
      <BaseTemplate header={<Header />}>
        <Loading />
      </BaseTemplate>
    ),
    started: () => (
      <BaseTemplate header={<Header />}>
        <Boards />
      </BaseTemplate>
    ),
  },
})

export const Boards = () => {
  return (
    <GridBoards
      idle={
        <div>
          <PanelBoardStyled heading="idle" />
          <TaskPreview
            title="HTTP is extensible"
            description="Introduced in HTTP/1.0, HTTP headers make this protocol easy to extend and experiment with. New functionality can even be introduced by a simple agreement between a client and a server about a new header's semantics."
          />
        </div>
      }
      take={
        <div>
          <PanelBoardStyled heading="take" />
          <TaskPreview
            title="Hoverable card"
            description="Introduced in HTTP/1.0, HTTP headers make this protocol easy to extend and experiment with. New functionality can even be introduced by a simple agreement between a client and a server about a new header's semantics."
          />
        </div>
      }
      resolve={
        <div>
          <PanelBoardStyled heading="resolve" />
          <TaskPreview
            title="Students"
            description="Introduced in HTTP/1.0, HTTP headers make this protocol easy to extend and experiment with. New functionality can even be introduced by a simple agreement between a client and a server about a new header's semantics."
          />
        </div>
      }
    />
  )
}

const PanelBoardStyled = styled(PanelBoard)`
  margin-bottom: 2rem;
`
