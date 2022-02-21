import { User } from '@geist-ui/core'
import React, { FC } from 'react'
import type { User as UserType } from '../..'

interface Props {
  className?: string
}

export const UserCard: FC<UserType & Props> = ({
  fullname,
  photoUrl,
  description,
  className,
}) => {
  return (
    <User className={className} src={photoUrl} name={fullname}>
      {description}
    </User>
  )
}
