import { createEffect, createEvent, createStore } from 'effector'
import { useKeenSlider } from 'keen-slider/react'

type SliderInstance = ReturnType<typeof useKeenSlider>[1]

export const $sliderRef = createStore<SliderInstance>({ current: null })

export const addRef = createEvent<SliderInstance>()
export const removeRef = createEvent()

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
