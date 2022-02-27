import { Loading } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React, { FC } from 'react'
import type { Project } from '~/shared/api/internal'
import { PaperSlide, SliderProvider } from '~/shared/lib/slider'
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
    // @temp
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <SliderProvider slides={{ perView: 4 }}>
      {projects.map((project) => (
        <PaperSlideStyled key={project.projectID}>
          <ProjectPreview project={project} />
        </PaperSlideStyled>
      ))}
    </SliderProvider>
  )
}

const PaperSlideStyled = styled(PaperSlide)`
  padding: 1.5rem;
`
