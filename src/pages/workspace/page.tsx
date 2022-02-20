import { styled } from '@linaria/react'
import React from 'react'
import { ProjectPreview } from '../../entities/project/ui'
import { BaseTemplate } from '../../shared/ui'
import { Header } from '../../widgets/header'

export const Workspace = () => {
  return (
    <BaseTemplate header={<Header />}>
      <Container>
        {Array.from({ length: 4 }, (_, i) => (
          <ProjectPreview key={i} />
        ))}
      </Container>
    </BaseTemplate>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
