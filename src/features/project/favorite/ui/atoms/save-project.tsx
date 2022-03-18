import { HeartFill, Heart } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import React, { FC } from 'react'

interface Props {
  isFavorite: boolean
  className?: string
  size?: number
}

export const SaveProject: FC<Props> = ({ isFavorite, className, size }) => {
  const label = isFavorite ? <HeartFill size={size} color="red" /> : <Heart size={size} />
  return (
    <Button className={className} data-favorite={isFavorite}>
      {label}
    </Button>
  )
}

const Button = styled.button``
