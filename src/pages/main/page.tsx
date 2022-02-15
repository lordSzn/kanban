import { styled } from '@linaria/react'
import React from 'react'
import { ProjectPreview } from '../../entities/project/ui'
import { BaseTemplate } from '../../shared/ui'

export const Main = () => {
  return (
    <BaseTemplate>
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
`
