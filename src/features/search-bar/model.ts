import { createEffect, createEvent, createStore, sample } from 'effector'
import { RefObject } from 'react'

export const searchFieldChanged = createEvent()
export const $searchValue = createStore('').on(
  searchFieldChanged,
  (_, text) => text
)

export const addFieldRef = createEvent<RefObject<HTMLInputElement>>()
export const focusSearchField = createEvent()

export const $ref = createStore<RefObject<HTMLInputElement>>({
  current: null,
}).on(addFieldRef, (_, ref) => ref)

export const focusFx = createEffect<RefObject<HTMLInputElement>, void>(
  (ref) => {
    ref.current?.focus()
  }
)

sample({
  source: $ref,
  clock: focusSearchField,
  filter: (ref) => Boolean(ref.current),
  target: focusFx,
})
