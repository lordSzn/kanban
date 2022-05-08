import { createEvent, createStore } from 'effector'
import type { User } from '~/shared/api/requests'

export const updateUser = createEvent<User>()

export const $user = createStore<User | null>(null).on(updateUser, (_, user) => user)
