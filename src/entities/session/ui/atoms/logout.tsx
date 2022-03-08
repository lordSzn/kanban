import { LogOut } from '@geist-ui/icons'
import { createEvent, sample } from 'effector'
import React from 'react'
import { PopoverAction } from '~/shared/ui'
import { sessionDeleteFx } from '../../model'

export const logoutClicked = createEvent()

sample({
  clock: logoutClicked,
  target: sessionDeleteFx,
})

export const Logout = () => {
  return (
    <PopoverAction
      onClick={() => logoutClicked()}
      text="Sign Out"
      icon={<LogOut size={15} />}
    />
  )
}
