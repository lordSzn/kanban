import { Monitor, User } from '@geist-ui/icons'
import React from 'react'

export const menuSettings = [
  {
    label: 'Account',
    icon: (
      <>
        <User size={23} />
      </>
    ),
    items: ['Profile', 'Preferences', 'Notifications'],
  },
  {
    label: 'Workspace',
    icon: (
      <>
        <Monitor size={23} />
      </>
    ),
    items: ['Labels', 'Topic', 'Keyboard bind'],
  },
]
