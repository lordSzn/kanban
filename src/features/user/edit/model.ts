import { createRoute } from 'atomic-router'
import { createEvent, createStore, sample } from 'effector'
import { spread } from 'patronum'
import { $currentUser } from '~/entities/session'

export const userEditRoute = createRoute()

export const fullnameChanged = createEvent<string>()
export const userNameChanged = createEvent<string>()
export const descriptionChanged = createEvent<string>()
export const emailChanged = createEvent<string>()

export const $fullname = createStore('').on(fullnameChanged, (_, fullname) => fullname)
export const $userName = createStore('')
  .on($fullname, (_, fullname) => fullname.split(' ')[0])
  .on(userNameChanged, (_, username) => username)

export const $description = createStore('').on(descriptionChanged, (_, description) => description)
export const $email = createStore('').on(emailChanged, (_, email) => email)
export const $photo = createStore('')

export const formSubmitted = createEvent()

sample({
  clock: userEditRoute.opened,
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
