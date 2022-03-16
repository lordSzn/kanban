import { useKeenSlider, KeenSliderOptions, KeenSliderHooks } from 'keen-slider/react'
import React, { FC, useState } from 'react'
import { SliderNavigation, NavigationSliderProps } from './slider-navigation'

type KeenParams = KeenSliderOptions<unknown, unknown, KeenSliderHooks> | undefined

type NavigationProps = Pick<NavigationSliderProps, 'onNext' | 'onPrev' | 'navigationClassName'>

interface Props {
  className?: string
  navigation?: boolean
}
// @fix in the future we should memoization component
export const SliderProvider: FC<Props & KeenParams & NavigationProps> = ({
  children,
  className = '',
  navigation = false,
  navigationClassName = '',
  onPrev,
  onNext,
  ...options
}) => {
  const [mounted, started] = useState(false)
  const [currentSlide, setCurrentSlider] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    created: () => started(true),
    destroyed: () => started(false),
    detailsChanged: (slider) => setCurrentSlider(slider.track.details.progress),

    ...options,
  })

  const isShowNavigation = mounted && navigation

  return (
    <>
      <div
        className={`keen-wrapper keen-slider ${className}`}
        style={{ cursor: 'grab' }}
        ref={sliderRef}
      >
        {children}
      </div>
      {isShowNavigation && instanceRef.current && (
        <SliderNavigation
          currentSlide={currentSlide}
          onPrev={onPrev}
          onNext={onNext}
          navigationClassName={navigationClassName}
          instance={instanceRef.current}
        />
      )}
    </>
  )
}
