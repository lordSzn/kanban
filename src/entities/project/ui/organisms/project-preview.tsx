import { Card, Image, Text } from '@geist-ui/core'
import React, { FC } from 'react'
import { Project } from '../..'

export const ProjectPreview: FC<Project> = ({
  projectID,
  title,
  isFinished,
  description,
  photoUrl,
}) => {
  return (
    <Card width="400px">
      <Image src={photoUrl} height="200px" width="400px" draggable={false} />
      <Text h4 mb={0}>
        {title}
      </Text>
      <Text type="secondary" small>
        {description}
      </Text>
    </Card>
  )
}
