import { Avatar } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React, { FC } from 'react'
import type { User } from '~/shared/api/requests'

interface Props {
  className?: string
  user: User | null
}

export const UserCard: FC<Props> = ({ user, className }) => {
  if (user === null) {
    return (
      <AvatarStyled
        isSquare
        text="NN"
        className={className}
        width={1.38}
        height={1.38}
      />
    )
  }

  const fallback = user.fullname.charAt(0).toUpperCase()
  return (
    <AvatarStyled
      isSquare
      text={fallback}
      width={1.38}
      height={1.38}
      className={className}
      src={user.photoUrl}
    />
  )
}

const AvatarStyled = styled(Avatar)`
  cursor: pointer;
`
