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
import { useStore, useStoreMap } from 'effector-react'
import React, { CSSProperties, FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { $tasks } from '~/entities/task'
import { TaskPreview } from '~/entities/task/ui'
import { Status } from '~/shared/api/requests'
import { PanelBoard } from '~/shared/ui'
import { $boards, $normalizeTasks, taskLifecycleState } from '../../model'
import type { NormalizedTasks } from '../../types'

export const BoardsBaseStruts: FC<{ extra?: ReactNode }> = ({ extra }) => {
  const boards = useStore($boards)
  const tasks = useStore($normalizeTasks)

  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const flatTaskList = (tasks: Record<Status, NormalizedTasks[]>, label: Status) =>
    tasks[label].map((task) => task.taskId)

  return (
    <Grid.Container gap={10} justify="center" mt={1}>
      <DndContext
        sensors={sensors}
        onDragStart={taskLifecycleState.dragStarted}
        onDragEnd={taskLifecycleState.dragEnded}
      >
        {boards.map((board) => (
          <Grid xs={6} key={board}>
            <Board amount={tasks[board].length} title={board} extra={extra}>
              <SortableContext items={flatTaskList(tasks, board)}>
                {tasks[board].map((task) => (
                  <TaskDraggable key={task.taskId} task={task} />
                ))}
              </SortableContext>
            </Board>
          </Grid>
        ))}
        <Overlay />
      </DndContext>
    </Grid.Container>
  )
}

export const Board: FC<{ title: string; extra: ReactNode; amount: number }> = ({
  title,
  extra,
  children,
  amount,
}) => {
  return (
    <div style={{ width: '100%' }}>
      <PanelBoard heading={title} amount={amount}>
        {extra}
      </PanelBoard>
      <Spacer h={0.3} />
      {children}
    </div>
  )
}

export const TaskDraggable: FC<{ task: NormalizedTasks }> = ({ task }) => {
  const { setNodeRef, listeners, attributes, transform, transition } = useSortable({
    id: task.taskId,
  })

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <TaskPreviewStyled key={task.taskId} title={task.title} description={task.description} />
    </div>
  )
}

export const Overlay: FC = () => {
  const activeId = useStore(taskLifecycleState.$activeItemId)
  const task = useStoreMap({
    store: $tasks,
    keys: [activeId],
    fn: (tasks, [id]) => (id ? tasks[id] : null),
  })
  return createPortal(
    <DragOverlay>
      {task && <TaskPreview title={task.title} description={task.description} />}
    </DragOverlay>,
    document.body
  )
}

const TaskPreviewStyled = styled(TaskPreview)`
  margin: 1rem 0 2rem 0 !important;
`
