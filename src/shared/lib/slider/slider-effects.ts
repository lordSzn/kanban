import { createEffect, createEvent, createStore, sample } from 'effector'
import { KeenSliderHooks, KeenSliderInstance } from 'keen-slider/react'
import { MutableRefObject } from 'react'

type KeenOptions = KeenSliderInstance<unknown, unknown, KeenSliderHooks>

type SliderInstance = MutableRefObject<KeenSliderInstance<
  unknown,
  unknown,
  KeenSliderHooks
> | null>

export const addRef = createEvent<SliderInstance>()
export const removeRef = createEvent()

export const $sliderRef = createStore<SliderInstance>({ current: null })
  .on(addRef, (_, ref) => ref)
  .reset(removeRef)

export const sliderOpened = createEvent()
export const sliderDestroyed = createEvent()

export const $opened = createStore(false)
  .on(sliderOpened, () => true)
  .on(sliderDestroyed, () => false)

export const slideChanged = createEvent<KeenOptions>()

sample({
  clock: sliderDestroyed,
  target: removeRef,
})

export const nextSlide = createEffect<SliderInstance, void, void>(
  (instance) => {
    instance.current?.next()
  }
)

export const prevSlide = createEffect<SliderInstance, void, void>(
  (instance) => {
    instance.current?.prev()
  }
)