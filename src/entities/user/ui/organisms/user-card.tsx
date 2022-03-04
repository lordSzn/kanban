import { useMediaQuery, User } from '@geist-ui/core'
import { styled } from '@linaria/react'
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
  const fallback = fullname.charAt(0).toUpperCase()
  const isMobile = useMediaQuery('md', { match: 'down' })
  return (
    <UserStyled
      className={className}
      data-screen={isMobile}
      text={fallback}
      src={photoUrl}
      name={fullname}
    >
      {description}
    </UserStyled>
  )
}

const UserStyled = styled(User)`
  &[data-screen='true'] {
    & .name {
      display: none;
    }
  }
`
