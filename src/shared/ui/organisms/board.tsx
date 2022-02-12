import React, { FC } from 'react'
import styled from 'styled-components'

export const Board: FC = ({ children }) => {
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
