import { createEvent, createStore } from 'effector'

export interface Board {
  boardID: string
  projectID: string
  heading: string
}

export const addBoard = createEvent<Pick<Board, 'heading'>>()
export const $boards = createStore<Board[]>([])
