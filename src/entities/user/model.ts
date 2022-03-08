import { createStore } from 'effector'
import { User } from '~/shared/api/requests'

export const $user = createStore<User | null>(null)
