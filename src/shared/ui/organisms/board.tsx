import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children: ReactNode
}

export const Board = ({ children }: Props) => {
  return (
    <Container>
      <Heading></Heading>
      <Body>{children}</Body>
      <Action></Action>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Heading = styled.div``

const Body = styled.div``

const Action = styled.div``
