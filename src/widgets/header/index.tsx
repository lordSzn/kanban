import { styled } from '@linaria/react'
import React from 'react'

export const Header = () => {
  return (
    <Container>
      <Title>Kanban</Title>
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 4rem;
`

const Title = styled.div``
