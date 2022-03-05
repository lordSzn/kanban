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
// @refactor
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
    <SliderProvider
      slides={{ perView: 4 }}
      navigation
      onNext={(slider) => slider.next()}
      onPrev={(slider) => slider.prev()}
      breakpoints={{
        '(max-width: 1580px)': {
          slides: { perView: 3, spacing: 15 },
        },
        '(max-width: 1230px)': {
          slides: { perView: 2 },
        },
        '(max-width: 830px)': {
          slides: { perView: 'auto', spacing: 10 },
        },
      }}
    >
      {projects.map((project) => (
        <PaperSlideStyled key={project.projectID}>
          <ProjectPreview project={project} />
        </PaperSlideStyled>
      ))}
    </SliderProvider>
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
