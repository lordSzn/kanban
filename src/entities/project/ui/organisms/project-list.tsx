import { styled } from '@linaria/react'
import { useList } from 'effector-react'
import React from 'react'
import { $projects } from '../..'
import { ProjectPreview } from './project-preview'

export const ProjectList = () => {
  const projectsList = useList($projects, {
    getKey: (project) => project.projectID,
    fn: ({ projectID, title, description, isFinished, photoUrl }) => (
      <Container>
        <ProjectPreview
          title={title}
          projectID={projectID}
          isFinished={isFinished}
          photoUrl={photoUrl}
          description={description}
        />
      </Container>
    ),
  })

  return projectsList
}

const Container = styled.div`
  margin-right: 1.5rem;
`
