import { Text } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React, { FC } from 'react'

interface Props {
  heading: string
  amount?: number
  className?: string
}

export const PanelBoard: FC<Props> = ({ heading, className, amount, children = 0 }) => {
  return (
    <Container className={className}>
      <Text span font="20px">
        {heading} ({amount})
      </Text>
      {children}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
