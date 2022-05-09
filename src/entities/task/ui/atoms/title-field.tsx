import { Input } from '@geist-ui/core'
import { useStore } from 'effector-react'
import React from 'react'
import { $title, titleChanged } from '~/entities/task'

export const TitleField = () => {
  const title = useStore($title)
  return (
    <Input
      value={title}
      width="100%"
      onChange={(e) => titleChanged(e.target.value)}
      placeholder="Task title"
    />
  )
}
