import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
  title: string
  description: string
}

export const TaskPreview: FC<Props> = () => {
  return (
    <Container>
      <Title>Hero title</Title>
      <Description>description...</Description>
    </Container>
  )
}

const Container = styled.div`
  font-size: var(--font-desktop-base);
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: calc(100% - 1rem);
  padding: 2rem;
`

const Title = styled.h4``

const Description = styled.p``
