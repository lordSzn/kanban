import { styled } from '@linaria/react'
import React from 'react'
import { UserCard } from '~/entities/user/ui'

export const Header = () => {
  return (
    <Container>
      <Title>Kanban</Title>
      <UserCard fullname="robert kuzhin" />
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
