import { CornerUpLeft } from '@icon-park/react'
import { styled } from '@linaria/react'
import React from 'react'

export const Header = () => {
  return (
    <Container>
      <CornerUpLeft />
      <GoBack>Back to workspace</GoBack>
    </Container>
  )
}

const Container = styled.header`
  min-height: 4rem;
  display: flex;
  align-items: center;
`

const GoBack = styled.span`
  margin-left: 0.5rem;
`
