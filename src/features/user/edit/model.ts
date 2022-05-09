import { createRoute } from 'atomic-router'
import { combine, createEvent, createStore, sample } from 'effector'
import { every, spread } from 'patronum'
import { $currentUser } from '~/entities/session'
import { uploadAvatarProfileFx, updateUserProfileFx } from '~/shared/api/requests'
import { showMessage } from '~/shared/lib/toast'
import { validateDescription, validateEmail, validateFullname } from './library'

export const userEditRoute = createRoute()

export const fullnameChanged = createEvent<string>()
export const descriptionChanged = createEvent<string>()
export const emailChanged = createEvent<string>()
export const avatarChanged = createEvent<File[]>()

export const $fullname = createStore('').on(fullnameChanged, (_, fullname) => fullname)
export const $description = createStore('').on(descriptionChanged, (_, description) => description)
export const $email = createStore('').on(emailChanged, (_, email) => email)

export const $photo = createStore('').on(avatarChanged, (_, file) => URL.createObjectURL(file[0]))
export const $file = createStore<File | null>(null).on(avatarChanged, (_, file) => file[0])

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

export const $emailValid = $email.map(validateEmail)
export const $fullnameValid = $fullname.map(validateFullname)
export const $descriptionValid = $fullname.map(validateDescription)
export const $avatarHasChanged = createStore(false).on(avatarChanged, () => true)

export const $formValid = every({
  stores: [$emailValid, $fullnameValid, $descriptionValid],
  predicate: (result) => result === null,
})

export const $form = combine({
  fullname: $fullname,
})

sample({
  clock: formSubmitted,
  source: $file,
  filter: Boolean,
  fn: (file) => ({ image: file }),
  target: uploadAvatarProfileFx,
})

sample({
  clock: formSubmitted,
  source: $form,
  filter: $avatarHasChanged.map((is) => !is),
  target: updateUserProfileFx,
})

sample({
  clock: uploadAvatarProfileFx.doneData,
  source: $form,
  fn: (form, { photoUrl }) => ({ ...form, photoUrl }),
  target: updateUserProfileFx,
})

showMessage({
  when: updateUserProfileFx.done,
  toast: () => ({
    type: 'success',
    text: 'profile edit success',
  }),
})
