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
  // @fix
  const rightDisabled = currentSlide === 2

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
  width: 30px;
  height: 30px;
  transform: translateY(-50%);
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
  }

  & > svg {
    fill: #fff;
  }

  &[data-arrow='left'] {
    left: 5px;
  }

  &[data-arrow='right'] {
    left: auto;
    right: 5px;
  }
`
