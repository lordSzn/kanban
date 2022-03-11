import { createRoute } from 'atomic-router'
import { createEvent, createStore, sample } from 'effector'
import { spread } from 'patronum'
import { $currentUser } from '~/entities/session'

export const userEditRoute = createRoute()

export const pageMounted = createEvent()

export const fullnameChanged = createEvent<string>()
export const userNameChanged = createEvent<string>()
export const descriptionChanged = createEvent<string>()
export const emailChanged = createEvent<string>()

export const $fullname = createStore('')
export const $userName = createStore('').on($fullname, (_, fullname) => fullname.split(' ')[0])
export const $description = createStore('')
export const $photo = createStore('')
export const $email = createStore('')

export const formSubmitted = createEvent()

sample({
  clock: pageMounted,
  source: $currentUser,
  filter: Boolean,
  target: spread({
    targets: {
      fullname: $fullname,
      photoUrl: $photo,
      description: $description,
      email: $email,
    },
  }),
})
