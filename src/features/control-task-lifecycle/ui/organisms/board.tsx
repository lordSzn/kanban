import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grid, Spacer } from '@geist-ui/core'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React, { CSSProperties, FC, ReactNode, useMemo } from 'react'
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

  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  return (
    <Grid.Container gap={10} justify="center">
      {boards.map((board) => (
        <Grid xs={6} key={board}>
          <Board title={board} tasks={tasks[board]} extra={extra} />
        </Grid>
      ))}
    </Grid.Container>
  )
}

export const Board: FC<Props> = ({ title, extra, tasks }) => {
  const { setNodeRef } = useDroppable({ id: title })

  const flatList = useMemo(() => {
    return tasks.map((task) => task.taskId)
  }, [tasks])

  return (
    <DndContext>
      <div ref={setNodeRef} style={{ width: '100%' }}>
        <PanelBoard heading={title} amount={tasks.length}>
          {extra}
        </PanelBoard>
        <Spacer h={0.3} />
        <SortableContext items={flatList}>
          {tasks.map((task) => (
            <TaskDraggable key={task.taskId} task={task} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  )
}

export const TaskDraggable: FC<{ task: NormalizedTasks }> = ({ task }) => {
  const { setNodeRef, listeners, attributes, transform } = useSortable({
    id: task.taskId,
  })

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
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

const TaskPreviewStyled = styled(TaskPreview)`
  margin: 1rem 0 2rem 0 !important;
`
