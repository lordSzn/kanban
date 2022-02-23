import { Card, Text, Image } from '@geist-ui/core'
import { Link } from 'atomic-router-react'
import React, { FC } from 'react'
import type { Project } from '~/shared/api/internal'
import { paths } from '~/shared/lib/paths'

export const ProjectPreview: FC<Project> = ({
  projectID,
  title,
  description,
  photoUrl,
}) => {
  return (
    <Link to={paths.project(projectID)}>
      <Card width="300px" shadow>
        <Image height="200px" width="300px" src={photoUrl} />
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
