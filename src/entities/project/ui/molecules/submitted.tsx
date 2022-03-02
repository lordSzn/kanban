import { Button } from '@geist-ui/core'
import React from 'react'
import { showCreationForm } from '../..'

export const SubmittedProject = () => (
  <Button auto ghost type="secondary" onClick={showCreationForm} scale={0.6}>
    Create project
  </Button>
)
