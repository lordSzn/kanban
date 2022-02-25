import { Card, Text, Image } from '@geist-ui/core'
import { Link } from 'atomic-router-react'
import React, { FC } from 'react'
import type { Project } from '~/shared/api/internal'
import { paths } from '~/shared/lib/paths'

interface Props {
  project: Project
  className?: string
}

export const ProjectPreview: FC<Props> = ({ project, className }) => {
  return (
    <Link className={className} to={paths.project(project.projectID)}>
      <Card width="300px" shadow>
        <Image height="200px" width="300px" src={project.photoUrl} />
        <Text h4 mb={0}>
          {project.title}
        </Text>
        <Text type="secondary" small>
          {project.description}
        </Text>
      </Card>
    </Link>
  )
}
