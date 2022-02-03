import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { createEvent } from 'effector'

export const dragStarted = createEvent<DragStartEvent>()
export const dragOver = createEvent<DragOverEvent>()
export const dragEnded = createEvent<DragEndEvent>()