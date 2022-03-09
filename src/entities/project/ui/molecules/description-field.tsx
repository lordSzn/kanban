import { Textarea } from '@geist-ui/core'
import React from 'react'
import { descriptionChanged } from '../..'

interface Props {
  description: string
}

export const DescriptionField = ({ description }: Props) => {
  return (
    <>
      <Textarea
        width="100%"
        placeholder="Project description"
        value={description}
        onChange={(e) => descriptionChanged(e.target.value)}
      />
    </>
  )
}
