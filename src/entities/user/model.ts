import { createStore } from 'effector'

export interface User {
  fullname: string
  email?: string | null
  photoUrl?: string
  description?: string
}

export const $user = createStore<User | null>(null)
