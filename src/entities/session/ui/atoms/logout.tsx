import { Text } from '@geist-ui/core'
import { LogOut } from '@geist-ui/icons'
import { css } from '@linaria/core'
import { Link } from 'atomic-router-react'
import { createEvent, sample } from 'effector'
import React from 'react'
import { paths } from '~/shared/lib/paths'
import { logout } from '../../model'

export const logoutClicked = createEvent()

sample({
  clock: logoutClicked,
  target: logout,
})

export const Logout = () => {
  return (
    <Link to={paths.login()} onClick={() => logoutClicked()} className={linkClasses}>
      <LogOut />
      <Text span data-element="text">
        Sign out
      </Text>
    </Link>
  )
}

const linkClasses = css`
  cursor: pointer;

  display: flex;
  align-items: center;

  max-width: 100%;
  max-height: 100%;

  padding-left: 6px;
  width: 100%;
  height: 2.8rem;

  background-color: transparent;
  border: none;

  border-radius: 0.3rem;

  & > [data-element='text'] {
    margin-left: 1.3rem;
  }
`
