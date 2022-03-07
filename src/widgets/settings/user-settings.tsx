import { Popover, User, useTheme } from '@geist-ui/core'
import React from 'react'
import { Logout } from '~/features/session/ui'
import { SwitchTheme } from '~/features/theme/ui'

export const UserSettings = () => {
  const theme = useTheme()
  return (
    <>
      <Popover.Item title width="260px">
        <User name="Robert kuzhin">JavaScript engineer</User>
      </Popover.Item>
      <Popover.Item>
        <SwitchTheme theme={theme} />
      </Popover.Item>
      <Popover.Item line />
      <Popover.Item>
        <Logout />
      </Popover.Item>
    </>
  )
}
