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
        <div>
          <PanelBoardStyled heading="idle" />
          {idleTasks.map((task) => (
            <TaskPreview key={task.taskID} title={task.title} description={task.description} />
          ))}
        </div>
      }
      take={
        <div>
          <PanelBoardStyled heading="take" />
          {processingTasks.map((task) => (
            <TaskPreview key={task.taskID} title={task.title} description={task.description} />
          ))}
        </div>
      }
      resolve={
        <div>
          <PanelBoardStyled heading="resolve" />
          {completedTasks.map((task) => (
            <TaskPreview key={task.taskID} title={task.title} description={task.description} />
          ))}
        </div>
      }
    />
  )
}

const PanelBoardStyled = styled(PanelBoard)`
  margin-bottom: 2rem;
`
