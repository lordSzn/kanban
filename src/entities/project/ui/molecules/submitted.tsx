import { Button, useMediaQuery } from '@geist-ui/core'
import { Plus } from '@icon-park/react'
import React from 'react'
import { showCreationForm } from '../..'

export const SubmittedProject = () => {
  const upMD = useMediaQuery('md', { match: 'up' })
  return (
    <Button
      auto
      ghost
      type="secondary"
      mr={1.5}
      onClick={showCreationForm}
      scale={0.77}
    >
      {upMD ? ' Create project' : <Plus />}
    </Button>
  )
}
