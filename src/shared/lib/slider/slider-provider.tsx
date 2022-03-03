import {
  useKeenSlider,
  KeenSliderOptions,
  KeenSliderHooks,
} from 'keen-slider/react'
import React, { FC, useLayoutEffect } from 'react'
import {
  addRef,
  slideChanged,
  sliderDestroyed,
  sliderOpened,
} from './slider-effects'

type KeenParams =
  | KeenSliderOptions<unknown, unknown, KeenSliderHooks>
  | undefined

interface Props {
  className?: string
}

export const SliderProvider: FC<Props & KeenParams> = ({
  children,
  className = '',
  ...options
}) => {
  const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
    created: () => sliderOpened(),
    destroyed: () => sliderDestroyed(),
    slideChanged,
    ...options,
  })

  useLayoutEffect(() => {
    addRef(sliderInstance)
  }, [])

  return (
    <div
      className={`keen-slider ${className}`}
      style={{ cursor: 'move' }}
      ref={sliderRef}
    >
      {children}
    </div>
  )
}
