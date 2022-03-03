import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import {
  useKeenSlider,
  KeenSliderOptions,
  KeenSliderHooks,
} from 'keen-slider/react'
import React, { FC, useLayoutEffect } from 'react'
import {
  addRef,
  $opened,
  slideChanged,
  sliderDestroyed,
  sliderOpened,
} from './slider-effects'
import { SliderNavigation, NavigationSliderProps } from './slider-navigation'

type KeenParams =
  | KeenSliderOptions<unknown, unknown, KeenSliderHooks>
  | undefined

interface Props extends NavigationSliderProps {
  className?: string
  navigation?: boolean
}

export const SliderProvider: FC<Props & KeenParams> = ({
  children,
  className = '',
  navigation = false,
  navigationClassName = '',
  onPrev,
  onNext,
  leftDisable,
  rightDisable,
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

  const isOpened = useStore($opened)
  const isShowNavigation = navigation && isOpened

  return (
    <>
      <div
        className={`keen-wrapper keen-slider ${className}`}
        style={{ cursor: 'move' }}
        ref={sliderRef}
      >
        {children}
      </div>
      {isShowNavigation && (
        <SliderNavigation
          onPrev={onPrev}
          onNext={onNext}
          navigationClassName={navigationClassName}
          rightDisable={rightDisable}
          leftDisable={leftDisable}
        />
      )}
    </>
  )
}
