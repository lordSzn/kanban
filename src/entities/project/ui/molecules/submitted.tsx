import { Button } from '@geist-ui/core'
import React from 'react'
import { createProject } from '../..'

export const SubmittedProject = () => (
  <Button auto ghost type="secondary" onClick={createProject} scale={0.6}>
    Create project
  </Button>
)
