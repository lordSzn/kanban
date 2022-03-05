import { Loading } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React, { FC } from 'react'
import type { Project } from '~/shared/api/internal'
import { PaperSlide } from '~/shared/lib/slider'
import { EmptyBlock } from '~/shared/ui'
import { ProjectsCarousel } from '../molecules'
import { ProjectPreview } from './project-preview'

interface Props {
  projects: Project[]
  loading: boolean
}

export const ProjectList: FC<Props> = ({ projects, loading }) => {
  if (loading) {
    return <Loading>loading</Loading>
  }

  if (projects.length === 0) {
    return (
      <EmptyBlock
        title="Your have no projects"
        message="Create a new project"
      />
    )
  }

  if (projects.length < 5) {
    return (
      <Container>
        {projects.map((project) => (
          <ProjectPreviewStyled key={project.projectID} project={project} />
        ))}
      </Container>
    )
  }

  return (
    <ProjectsCarousel>
      {projects.map((project) => (
        <PaperSlideStyled key={project.projectID}>
          <ProjectPreview project={project} />
        </PaperSlideStyled>
      ))}
    </ProjectsCarousel>
  )
}

const PaperSlideStyled = styled(PaperSlide)`
  padding: 1.5rem 0 1.5rem 0;

  display: flex;
  justify-content: center;
`

const Container = styled.section`
  display: flex;
`

const ProjectPreviewStyled = styled(ProjectPreview)`
  &:not(:last-child) {
    margin-right: 2rem;
  }
`
