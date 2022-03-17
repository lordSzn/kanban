import { Card, Text, Image, useTheme } from '@geist-ui/core'
import { styled } from '@linaria/react'
import { Link } from 'atomic-router-react'
import React, { FC, ReactNode } from 'react'
import type { Project } from '~/shared/api/requests'
import { paths } from '~/shared/lib/paths'

interface Props {
  project: Project
  className?: string
  extra?: ReactNode
}

export const ProjectPreview: FC<Props> = ({ project, className, extra }) => {
  const { type } = useTheme()

  return (
    <CardStyled data-theme={type} width="300px" shadow padding={0}>
      <Link className={className} to={paths.project(project.projectID)}>
        <Image width="300px" height="200px" src={project.photoUrl} alt="project preview" />
        <GroupBody>
          <Text h4 mb={0}>
            {project.title}
          </Text>
          <Text type="secondary" small>
            {project.description}
          </Text>
        </GroupBody>
      </Link>
      <Card.Footer>{extra}</Card.Footer>
    </CardStyled>
  )
}

const CardStyled = styled(Card)`
  & .content {
    padding: 0 !important;
  }

  &[data-theme='dark'] {
    &:hover {
      box-shadow: 0 0 0 1px #fff !important;
    }
  }
`

const GroupBody = styled.div`
  padding: 0 1rem 1rem;
`
