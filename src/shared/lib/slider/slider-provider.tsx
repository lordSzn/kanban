import {
  KeenSliderHooks,
  KeenSliderPlugin,
  useKeenSlider,
} from 'keen-slider/react'
import React, { FC, ReactNode, useLayoutEffect } from 'react'
import { addRef, slideChanged, sliderOpened } from './slider-effects'

type KeenParams = Parameters<typeof useKeenSlider>[0]
interface Props {
  children: ReactNode | ReactNode[]
  className?: string
  plugins?: KeenSliderPlugin<unknown, unknown, KeenSliderHooks>[] | undefined
}

export const SliderProvide = ({
  children,
  className,
  plugins,
  ...options
}: Props & KeenParams) => {
  const [sliderRef, sliderInstance] = useKeenSlider(
    {
      created: () => sliderOpened(),
      slideChanged,
      ...options,
    },
    plugins
  )

  useLayoutEffect(() => {
    addRef(sliderInstance)
  }, [])

  return (
    <div className={`keen-slider ${className}`} ref={sliderRef}>
      {children}
    </div>
  )
}
