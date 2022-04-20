import { DndContext, DragOverlay } from '@dnd-kit/core'
import { Spacer } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { TaskPreview } from '~/entities/task/ui'
import { PanelBoard } from '~/shared/ui'
import type { NormalizedTasks } from '../../types'

interface Props {
  title: string
  extra?: ReactNode
  tasks: NormalizedTasks[]
}

export const Board: FC<Props> = ({ title, extra, tasks }) => {
  return (
    <DndContext>
      <BoardContainer>
        <PanelBoard heading={title} amount={tasks.length}>
          {extra}
        </PanelBoard>
        <Spacer h={0.3} />
        {tasks.map((task) => (
          <TaskPreviewStyled key={task.taskId} title={task.title} description={task.description} />
        ))}
      </BoardContainer>
    </DndContext>
  )
}

export const Overlay: FC = () => {
  return createPortal(
    <DragOverlay>
      <TaskPreview title="" description="" />
    </DragOverlay>,
    document.body
  )
}

const BoardContainer = styled.div`
  width: 100%;
`

const TaskPreviewStyled = styled(TaskPreview)`
  margin: 1rem 0 2rem 0 !important;
`
