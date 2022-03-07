import { Popover, User } from '@geist-ui/core'
import React from 'react'
import { Logout } from '~/features/session/ui'
import { SwitchTheme } from '~/features/theme/ui'

export const UserSettings = () => {
  return (
    <>
      <Popover.Item title width="260px">
        <User name="Robert kuzhin">JavaScript engineer</User>
      </Popover.Item>
      <Popover.Item>
        <SwitchTheme />
      </Popover.Item>
      <Popover.Item line />
      <Popover.Item>
        <Logout />
      </Popover.Item>
    </>
  )
}
