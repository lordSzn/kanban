import { Popover, User } from '@geist-ui/core'
import React, { FC, ReactNode } from 'react'

interface Props {
  theme: ReactNode
  signOut: ReactNode
  setup: ReactNode
}

export const UserSettings: FC<Props> = ({ theme, signOut, setup }) => {
  return (
    <>
      <Popover.Item title width="260px">
        <User name="Robert kuzhin">JavaScript engineer</User>
      </Popover.Item>
      <Popover.Item>{setup}</Popover.Item>
      <Popover.Item>{theme}</Popover.Item>
      <Popover.Item line />
      <Popover.Item>{signOut}</Popover.Item>
    </>
  )
}
