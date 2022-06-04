import { Button, Card, Popover, Text, useMediaQuery } from '@geist-ui/core'
import { Copy, Edit2, Link, MoreHorizontal, Trash2 } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import React, { forwardRef, useState } from 'react'
import { taskRemove } from '~/entities/task'
import { Dropdown } from '~/shared/ui/molecules'

interface Props {
  taskId: string
  title: string
  description: string
  className?: string
}

export const ContextMenu = ({ taskId }: { taskId: string }) => {
  return (
    <Dropdown.Content>
      <Dropdown.MenuGroup>
        <Dropdown.MenuItem>
          <Edit2 size={17} color="var(--currentColor)" />
          <span>Change task</span>
        </Dropdown.MenuItem>
      </Dropdown.MenuGroup>
      <Dropdown.Divider />
      <Dropdown.MenuGroup>
        <Dropdown.MenuItem>
          <Link size={17} color="var(--currentColor)" />
          <span>Copy link</span>
        </Dropdown.MenuItem>
        <Dropdown.MenuItem>
          <Copy size={17} color="var(--currentColor)" />
          <span>Duplicate</span>
        </Dropdown.MenuItem>
      </Dropdown.MenuGroup>
      <Dropdown.Divider />
      <Dropdown.MenuGroup>
        <Dropdown.MenuItem onClick={() => taskRemove({ taskId })}>
          <Trash2 size={17} color="var(--currentColor)" />
          <span>Delete</span>
        </Dropdown.MenuItem>
      </Dropdown.MenuGroup>
    </Dropdown.Content>
  )
}

export const MoreOptions = ({ taskId }: { taskId: string }) => {
  const [isOpen, setOpen] = useState(false)

  const toggle = () => setOpen((current) => !current)

  return (
    <Popover content={<ContextMenu taskId={taskId} />} visible={isOpen}>
      <Button type="abort" auto scale={0.6} icon={<MoreHorizontal />} onClick={toggle} />
    </Popover>
  )
}

export const TaskPreview = forwardRef<'div', Props>(
  ({ taskId, title, description, className }, ref) => {
    const upMd = useMediaQuery('md', { match: 'up' })
    return (
      <Card ref={ref} shadow marginBottom={10} className={className}>
        <Header>
          <Text h4>{title}</Text>
          {upMd && <MoreOptions taskId={taskId} />}
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
