import { Textarea } from '@geist-ui/core'
import { useStore } from 'effector-react'
import React from 'react'
import { $description, descriptionChanged } from '~/entities/task'

export const DescriptionField = () => {
  const description = useStore($description)
  return (
    <Textarea
      value={description}
      width="100%"
      onChange={(e) => descriptionChanged(e.target.value)}
      placeholder="Add description"
    />
  )
}
