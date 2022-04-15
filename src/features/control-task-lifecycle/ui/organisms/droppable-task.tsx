import { useDroppable } from '@dnd-kit/core'
import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { TaskPreview } from '~/entities/task/ui'
import { Task } from '~/shared/api/requests'

interface Props {
  task: Task
}

export const DroppableTask: FC<Props> = ({ task }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  })

  return (
    <Container data-over={isOver} ref={setNodeRef}>
      <TaskPreview title={task.title} description={task.description} />
    </Container>
  )
}

const Container = styled.div`
  padding: 0;

  [data-over='true'] {
    color: green;
  }
`
