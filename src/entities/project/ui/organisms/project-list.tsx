import { styled } from '@linaria/react'
import React, { FC } from 'react'
import type { Project } from '~/shared/api/internal'
import { ProjectPreview } from './project-preview'

interface Props {
  projects: Project[]
}

export const ProjectList: FC<Props> = ({ projects }) => {
  return (
    <>
      {projects.map((project) => (
        <Container key={project.projectID}>
          <ProjectPreview
            title={project.title}
            projectID={project.projectID}
            description={project.description}
            isFinished={project.isFinished}
            photoUrl={project.photoUrl}
          />
        </Container>
      ))}
    </>
  )
}

const Container = styled.div`
  margin-right: 1.5rem;
`
