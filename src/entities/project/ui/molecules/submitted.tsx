import { Button, useMediaQuery } from '@geist-ui/core'
import { Plus } from '@geist-ui/icons'
import React from 'react'
import { showCreationForm } from '../..'

export const SubmittedProject = () => {
  const tableScreen = useMediaQuery('md', { match: 'down' })

  if (tableScreen) {
    return (
      <Button
        auto
        ghost
        type="secondary"
        mr={1.5}
        onClick={showCreationForm}
        scale={0.77}
        icon={<Plus />}
      />
    )
  }

  return (
    <Button auto ghost type="secondary" mr={1.5} onClick={showCreationForm} scale={0.77}>
      Create project
    </Button>
  )
}
