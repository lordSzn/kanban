import { Badge, Description } from '@geist-ui/core'
import { EditOne } from '@icon-park/react'
import { styled } from '@linaria/react'
import React, { FC } from 'react'

interface Props {
  title: string
  description: string
}

export const TaskPreview: FC<Props> = ({ title, description }) => {
  return (
    <Container>
      <Header>
        <Badge type="success">Success</Badge>
        <EditOne />
      </Header>
      <Description title={title} content={description} />
    </Container>
  )
}

const Container = styled.div`
  width: calc(100% - 0.5rem);
  border-radius: 1rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
