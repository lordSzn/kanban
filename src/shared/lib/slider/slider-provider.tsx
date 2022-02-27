import {
  KeenSliderHooks,
  KeenSliderPlugin,
  useKeenSlider,
} from 'keen-slider/react'
import React, { FC, useLayoutEffect } from 'react'
import { addRef, slideChanged, sliderOpened } from '.'

type KeenParams = Parameters<typeof useKeenSlider>[0]
interface Props {
  className?: string
  plugins: KeenSliderPlugin<unknown, unknown, KeenSliderHooks>[] | undefined
}

export const SliderProvider: FC<Props & KeenParams> = ({
  children,
  className,
  plugins,
  ...options
}) => {
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
    <div className={className} ref={sliderRef}>
      {children}
    </div>
  )
}
