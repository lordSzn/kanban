import { Text } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React, { FC, ReactNode, MouseEventHandler } from 'react'

interface Props {
  className?: string
  icon?: ReactNode
  text: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const PopoverActionBase: FC<Props> = ({ className, icon, text, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {icon && <span data-element="icon">{icon}</span>}
      <Text span>{text}</Text>
    </button>
  )
}

export const PopoverAction = styled(PopoverActionBase)`
  display: flex;
  align-items: center;

  max-width: 100%;
  max-height: 100%;

  width: 100%;
  height: 2.8rem;

  background-color: transparent;
  border: none;

  border-radius: 0.3rem;

  & > [data-element='icon'] {
    padding-right: 1.3rem;
  }
`
