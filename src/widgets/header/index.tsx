import { Button } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React from 'react'

export const Header = () => {
  return (
    <Container>
      <Title>Kanban</Title>
      <Button type="secondary">Action</Button>
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 4rem;
`

const Title = styled.div`
  font-size: 1.5rem;
`
