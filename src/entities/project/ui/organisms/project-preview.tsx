import { Card, Text, Image, useTheme } from '@geist-ui/core'
import { styled } from '@linaria/react'
import { Link } from 'atomic-router-react'
import React, { FC } from 'react'
import type { Project } from '~/shared/api/requests'
import { paths } from '~/shared/lib/paths'

interface Props {
  project: Project
  className?: string
}

export const ProjectPreview: FC<Props> = ({ project, className }) => {
  const { type } = useTheme()

  return (
    <Link className={className} to={paths.project(project.projectID)}>
      <CardStyled data-theme={type} width="300px" height="340px" shadow>
        <Image height="200px" width="300px" src={project.photoUrl} alt="project preview" />
        <Text h4 mb={0}>
          {project.title}
        </Text>
        <Text type="secondary" small>
          {project.description}
        </Text>
      </CardStyled>
    </Link>
  )
}

const CardStyled = styled(Card)`
  &[data-theme='dark'] {
    &:hover {
      box-shadow: 0 0 0 1px #fff !important;
    }
  }
`
