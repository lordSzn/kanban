import { Left, Right } from '@icon-park/react'
import { css } from '@linaria/core'
import { KeenSliderHooks } from 'keen-slider'
import { KeenSliderInstance } from 'keen-slider/react'
import React from 'react'

type SliderInstance = KeenSliderInstance<unknown, unknown, KeenSliderHooks>

export interface NavigationSliderProps {
  navigationClassName?: string
  onNext?: (slider: SliderInstance) => void
  onPrev?: (slider: SliderInstance) => void
  currentSlide: number
  instance: SliderInstance
}

export const SliderNavigation = ({
  navigationClassName = '',
  onNext,
  onPrev,
  instance,
  currentSlide,
}: NavigationSliderProps) => {
  const leftDisabled = currentSlide === 0
  const rightDisabled = currentSlide === 1

  return (
    <>
      <button
        data-arrow="left"
        onClick={() => onPrev?.(instance)}
        className={`${arrowNavigation} ${navigationClassName}`}
        disabled={leftDisabled}
      >
        <Left size={40} />
      </button>
      <button
        onClick={() => onNext?.(instance)}
        data-arrow="right"
        className={`${arrowNavigation} ${navigationClassName}`}
        disabled={rightDisabled}
      >
        <Right size={40} />
      </button>
    </>
  )
}

const arrowNavigation = css`
  background-color: transparent;
  outline: none;
  border: none;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:disabled {
    opacity: 0.3;
  }

  &[data-arrow='left'] {
    left: 5px;
  }

  &[data-arrow='right'] {
    left: auto;
    right: 5px;
  }
`
