import { Settings } from '@geist-ui/icons'
import { css } from '@linaria/core'
import { Link } from 'atomic-router-react'
import React from 'react'
import { userEditRoute } from '~/features/user/edit'

export const UserEdit = () => {
  return (
    <Link to={userEditRoute} className={linkClasses}>
      <span data-element="icon">
        <Settings />
      </span>
      Settings
    </Link>
  )
}

const linkClasses = css`
  padding: 1px 4px;

  display: flex;
  align-items: center;

  max-width: 100%;
  max-height: 100%;

  width: 100%;
  height: 2.8rem;

  border-radius: 0.3rem;

  & > [data-element='icon'] {
    padding-right: 1.3rem;
  }
`
