import { Card, Text } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React, { forwardRef } from 'react'

interface Props {
  title: string
  description: string
  className?: string
}

export const TaskPreview = forwardRef<'div', Props>(({ title, description, className }, ref) => {
  return (
    <Card ref={ref} shadow marginBottom={10} className={className}>
      <Header>
        <Text h4>{title}</Text>
      </Header>
      <Text>{description}</Text>
    </Card>
  )
})

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
