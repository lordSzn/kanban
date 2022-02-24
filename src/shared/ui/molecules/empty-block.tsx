import { Text } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'

interface Props {
  title: string
  message: string
  icon?: ReactNode
  className?: string
}

const EmptyBlockBase: FC<Props> = ({ title, message, icon, className }) => {
  return (
    <div className={className}>
      <Text>{title}</Text>
      <Text>{message}</Text>
      {icon && <span data-element="icon">{icon}</span>}
    </div>
  )
}

export const EmptyBlock = styled(EmptyBlockBase)`
  text-align: center;
`
