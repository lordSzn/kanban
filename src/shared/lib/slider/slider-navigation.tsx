import { Left, Right } from '@icon-park/react'
import { css } from '@linaria/core'
import React, { MouseEventHandler } from 'react'

export interface NavigationSliderProps {
  navigationClassName?: string
  onNext?: MouseEventHandler<HTMLButtonElement>
  onPrev?: MouseEventHandler<HTMLButtonElement>
  leftDisable?: boolean
  rightDisable?: boolean
}

export const SliderNavigation = ({
  navigationClassName = '',
  leftDisable = false,
  rightDisable = false,
  onNext,
  onPrev,
}: NavigationSliderProps) => {
  return (
    <>
      <button
        onClick={onNext}
        data-arrow="left"
        className={`${arrowNavigation} ${navigationClassName}`}
        disabled={leftDisable}
      >
        <Left size={40} />
      </button>
      <button
        onClick={onPrev}
        data-arrow="right"
        className={`${arrowNavigation} ${navigationClassName}`}
        disabled={rightDisable}
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
