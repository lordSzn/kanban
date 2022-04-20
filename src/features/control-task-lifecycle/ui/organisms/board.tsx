import { DndContext, DragOverlay, useDraggable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { Grid, Spacer } from '@geist-ui/core'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React, { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { TaskPreview } from '~/entities/task/ui'
import { PanelBoard } from '~/shared/ui'
import { $boards, $normalizeTasks } from '../../model'
import type { NormalizedTasks } from '../../types'

interface Props {
  title: string
  extra?: ReactNode
  tasks: NormalizedTasks[]
}

export const BoardsBaseStruts: FC<{ extra?: ReactNode }> = ({ extra }) => {
  const boards = useStore($boards)
  const tasks = useStore($normalizeTasks)
  return (
    <Grid.Container gap={10} justify="center">
      <DndContext>
        {boards.map((board) => (
          <Grid xs={6} key={board}>
            <Board title={board} tasks={tasks[board]} extra={extra} />
          </Grid>
        ))}
      </DndContext>
    </Grid.Container>
  )
}

export const Board: FC<Props> = ({ title, extra, tasks }) => {
  const { setNodeRef } = useDraggable({ id: title })
  return (
    <BoardContainer ref={setNodeRef}>
      <PanelBoard heading={title} amount={tasks.length}>
        {extra}
      </PanelBoard>
      <Spacer h={0.3} />
      {tasks.map((task) => (
        <TaskDraggable key={task.taskId} task={task} />
      ))}
    </BoardContainer>
  )
}

export const TaskDraggable: FC<{ task: NormalizedTasks }> = ({ task }) => {
  const { setDraggableNodeRef, listeners, attributes } = useSortable({ id: task.taskId })
  return (
    <div ref={setDraggableNodeRef} {...listeners} {...attributes}>
      <TaskPreviewStyled key={task.taskId} title={task.title} description={task.description} />
    </div>
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
