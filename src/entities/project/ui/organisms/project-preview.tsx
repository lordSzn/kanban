import { Card, Text } from '@geist-ui/core'
import React, { FC } from 'react'
import { Project } from '../..'

export const ProjectPreview: FC<Partial<Project>> = () => {
  return (
    <Card width="400px">
      <Text h4 mb={0}>
        hello world
      </Text>
      <Text type="secondary" small>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odit!
      </Text>
    </Card>
  )
}
