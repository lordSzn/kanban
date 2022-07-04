import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grid, Spacer } from '@geist-ui/core'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { useStore, useStoreMap } from 'effector-react'
import React, { CSSProperties, FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { $tasks } from '~/entities/task'
import { TaskPreview } from '~/entities/task/ui'
import { Status, TaskLifecycle } from '~/shared/api/requests'
import { PanelBoard } from '~/shared/ui'
import { $taskLifecycle, taskLifecycleState } from '../../model'

export const BoardsBaseStructs: FC<{ extra?: ReactNode }> = ({ extra }) => {
  const boards = useStore($taskLifecycle)

  const touchSensor = useSensor(TouchSensor)
  //issue https://github.com/clauderic/dnd-kit/issues/355#issuecomment-874881817
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      tolerance: 0,
      delay: 150,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  const flatTaskList = (tasks: TaskLifecycle[]) => tasks.map((task) => task.taskId)

  return (
    <Grid.Container className={container} gap={4} width="100%" wrap="nowrap">
      <DndContext
        sensors={sensors}
        onDragStart={taskLifecycleState.dragStarted}
        onDragOver={taskLifecycleState.dragOver}
        onDragEnd={taskLifecycleState.dragEnded}
        collisionDetection={closestCenter}
      >
        {Object.entries(boards).map(([board, tasks]) => (
          <Grid sm={6} className={column} key={board}>
            <Board amount={boards[board as Status].length} title={board} extra={extra}>
              <SortableContext items={flatTaskList(tasks)} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                  <TaskDraggable key={task.taskId} taskId={task.taskId} />
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

const container = css`
  overflow: auto;
  padding: 24px 0 0 29px;
  min-height: 100vh;

  @media (min-width: 1023px) {
    justify-content: center;
  }
`

const column = css`
  min-width: 347px;
`

export const Board: FC<{ title: string; extra: ReactNode; amount: number }> = ({
  title,
  extra,
  children,
  amount,
}) => {
  const { setNodeRef } = useDroppable({ id: title })
  return (
    <div ref={setNodeRef} style={{ width: '100%' }}>
      <PanelBoard heading={title} amount={amount}>
        {extra}
      </PanelBoard>
      <Spacer h={0.3} />
      {children}
    </div>
  )
}

export const TaskDraggable: FC<{ taskId: string }> = ({ taskId }) => {
  const { setNodeRef, listeners, attributes, transform, transition } = useSortable({
    id: taskId,
  })

  const task = useStoreMap({
    store: $tasks,
    keys: [taskId],
    fn: (tasks, [id]) => tasks[id] ?? { title: 'not found', description: 'not found' },
  })

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <TaskPreviewStyled
        taskId={taskId}
        key={taskId}
        title={task.title}
        description={task.description}
        labels={task.labels}
      />
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
      {task && (
        <TaskPreview
          taskId={activeId!}
          title={task.title}
          description={task.description}
          labels={task.labels}
        />
      )}
    </DragOverlay>,
    document.body
  )
}

const TaskPreviewStyled = styled(TaskPreview)`
  margin: 1rem 0 2rem 0 !important;
`
