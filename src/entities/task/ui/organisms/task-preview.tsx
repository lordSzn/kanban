import { Card, Text } from '@geist-ui/core'
import { Edit } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import React, { FC } from 'react'

interface Props {
  title: string
  description: string
}

export const TaskPreview: FC<Props> = ({ title, description }) => {
  return (
    <Card shadow marginBottom={10}>
      <Header>
        <Text h4>{title}</Text>
        <Edit />
      </Header>
      <Text>{description}</Text>
    </Card>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
