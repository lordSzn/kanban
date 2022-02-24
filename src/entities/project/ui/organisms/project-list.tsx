import { Loading } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React, { FC } from 'react'
import type { Project } from '~/shared/api/internal'
import { EmptyBlock } from '~/shared/ui'
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
  return (
    <Container>
      {projects.map((project) => (
        <Wrapper key={project.projectID}>
          <ProjectPreview
            title={project.title}
            projectID={project.projectID}
            description={project.description}
            isFinished={project.isFinished}
            photoUrl={project.photoUrl}
          />
        </Wrapper>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Wrapper = styled.div`
  margin-right: 1.5rem;
`
