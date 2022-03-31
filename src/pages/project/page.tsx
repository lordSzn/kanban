import { variant } from '@effector/reflect'
import { Loading } from '@geist-ui/core'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React from 'react'
import { TaskPreview } from '~/entities/task/ui'
import { $completedTasks, $idleTasks, $processingTasks } from '~/features/task-lifecycle'
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
  const idleTasks = useStore($idleTasks)
  const processingTasks = useStore($processingTasks)
  const completedTasks = useStore($completedTasks)
  return (
    <GridBoards
      idle={
        <BoardContainer>
          <PanelBoardStyled heading="idle" />
          {idleTasks.map((task) => (
            <TaskPreview key={task.taskID} title={task.title} description={task.description} />
          ))}
        </BoardContainer>
      }
      take={
        <BoardContainer>
          <PanelBoardStyled heading="take" />
          {processingTasks.map((task) => (
            <TaskPreview key={task.taskID} title={task.title} description={task.description} />
          ))}
        </BoardContainer>
      }
      resolve={
        <BoardContainer>
          <PanelBoardStyled heading="resolve" />
          {completedTasks.map((task) => (
            <TaskPreview key={task.taskID} title={task.title} description={task.description} />
          ))}
        </BoardContainer>
      }
    />
  )
}

const PanelBoardStyled = styled(PanelBoard)`
  margin-bottom: 2rem;
`

export const BoardContainer = styled.div`
  width: 100%;
`
