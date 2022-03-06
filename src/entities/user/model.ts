import { createStore } from 'effector'
import { persist } from 'effector-storage/local'

export interface User {
  fullname: string
  email?: string | null
  photoUrl?: string
  description?: string
}

export const $user = createStore<User | null>(null)

persist({
  store: $user,
  key: 'current-user',
})
