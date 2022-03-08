import { Popover, User } from '@geist-ui/core'
import { Settings } from '@geist-ui/icons'
import React from 'react'
import { Logout } from '~/entities/session/ui'
import { SwitchTheme } from '~/features/theme/ui'
import { PopoverAction } from '~/shared/ui'

export const UserSettings = () => {
  return (
    <>
      <Popover.Item title width="260px">
        <User name="Robert kuzhin">JavaScript engineer</User>
      </Popover.Item>
      <Popover.Item>
        <SwitchTheme />
      </Popover.Item>
      <Popover.Item>
        <PopoverAction text="Settings" icon={<Settings />} />
      </Popover.Item>
      <Popover.Item line />
      <Popover.Item>
        <Logout />
      </Popover.Item>
    </>
  )
}
