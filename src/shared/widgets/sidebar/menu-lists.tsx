import { Monitor, User } from '@geist-ui/icons'
import React from 'react'
import { paths } from '~/shared/lib/paths'

export const menuSettings = [
  {
    label: 'Account',
    icon: (
      <>
        <User size={23} />
      </>
    ),
    items: [
      { name: 'Profile', href: paths.userEdit() },
      { name: 'Preferences', href: 'not/implemented' },
      { name: 'Notifications', href: 'not-implemented' },
    ],
  },
  {
    label: 'Workspace',
    icon: (
      <>
        <Monitor size={23} />
      </>
    ),
    items: [
      { name: 'Labels', href: 'not-implemented' },
      { name: 'Topic', href: 'not-implemented' },
      { name: 'Keyboard bind', href: 'not-implemented' },
      { name: 'Features', href: 'not-implemented' },
    ],
  },
]
