import { Input } from '@geist-ui/core'
import React from 'react'
import { titleChanged } from '../..'

interface Props {
  title: string
}

export const TitleField = ({ title }: Props) => {
  return (
    <>
      <Input
        width="100%"
        value={title}
        placeholder="Project title"
        onChange={(e) => titleChanged(e.target.value)}
      />
    </>
  )
}
