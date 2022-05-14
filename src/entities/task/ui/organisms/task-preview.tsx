import { Button, Card, Popover, Text } from '@geist-ui/core'
import { MoreHorizontal } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import React, { forwardRef, ReactNode, useState } from 'react'

interface Props {
  title: string
  description: string
  className?: string
  contextMenu?: ReactNode
}

export const MoreOptions = ({ contextMenu }: Pick<Props, 'contextMenu'>) => {
  const [isOpen, setOpen] = useState(false)

  const toggle = () => setOpen((current) => !current)

  return (
    <Popover content={contextMenu} visible={isOpen}>
      <Button type="abort" auto scale={0.6} icon={<MoreHorizontal />} onClick={toggle} />
    </Popover>
  )
}

export const TaskPreview = forwardRef<'div', Props>(
  ({ title, description, className, contextMenu }, ref) => {
    return (
      <Card ref={ref} shadow marginBottom={10} className={className}>
        <Header>
          <Text h4>{title}</Text>
          <MoreOptions contextMenu={contextMenu} />
        </Header>
        <Text>{description}</Text>
      </Card>
    )
  }
)

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
