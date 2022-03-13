import { Popover, User } from '@geist-ui/core'
import { Settings } from '@geist-ui/icons'
import { useStore } from 'effector-react'
import React from 'react'
import { $currentUser } from '~/entities/session'
import { Logout } from '~/entities/session/ui'
import { SwitchTheme } from '~/features/theme/ui'
import { userEditRoute } from '~/features/user/edit'
import { PopoverAction } from '~/shared/ui'

export const UserSettings = () => {
  const user = useStore($currentUser)
  return (
    <>
      <Popover.Item title width="260px">
        <User style={{ cursor: 'pointer' }} src={user?.photoUrl} name={user?.fullname}>
          {user?.description || 'JavaScript engineer'}
        </User>
      </Popover.Item>
      <Popover.Item>
        <SwitchTheme />
      </Popover.Item>
      <Popover.Item>
        <PopoverAction text="Settings" icon={<Settings />} onClick={() => userEditRoute.open({})} />
      </Popover.Item>
      <Popover.Item line />
      <Popover.Item>
        <Logout />
      </Popover.Item>
    </>
  )
}
