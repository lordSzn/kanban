import { Card, Text, Image } from '@geist-ui/core'
import { Link } from 'atomic-router-react'
import React, { FC } from 'react'
import { paths } from '~/shared/lib/paths'
import type { Project } from '../..'

export const ProjectPreview: FC<Project> = ({
  projectID,
  title,
  description,
  photoUrl,
}) => {
  return (
    <Link to={paths.project(projectID)}>
      <Card width="400px" shadow>
        <Image src={photoUrl} />
        <Text h4 mb={0}>
          {title}
        </Text>
        <Text type="secondary" small>
          {description}
        </Text>
      </Card>
    </Link>
  )
}
