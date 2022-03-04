import { Avatar } from '@geist-ui/core'
import React, { FC } from 'react'
import type { User as UserType } from '../..'

interface Props {
  className?: string
}

export const UserCard: FC<UserType & Props> = ({
  fullname,
  photoUrl,
  className,
}) => {
  const fallback = fullname.charAt(0).toUpperCase()
  return (
    <Avatar
      text={fallback}
      width={1.38}
      height={1.38}
      className={className}
      src={photoUrl}
    />
  )
}
