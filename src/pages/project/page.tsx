import { createRoute } from 'atomic-router'
import React from 'react'
import { BaseTemplate } from '../../shared/ui'

export const projectRouter = createRoute<{ id: string }>()

export const Project = () => {
  return <BaseTemplate>hello</BaseTemplate>
}
