import { createStore } from 'effector'

export interface User {
  fullname: string
  email?: string
  photoUrl?: string
  description?: string
}

export const $user = createStore(null)
