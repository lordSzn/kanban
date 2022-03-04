import { Button } from '@geist-ui/core'
import React from 'react'
import { showCreationForm } from '../..'

export const SubmittedProject = () => (
  <Button
    auto
    ghost
    type="secondary"
    mr={1.5}
    onClick={showCreationForm}
    scale={0.77}
  >
    Create project
  </Button>
)
