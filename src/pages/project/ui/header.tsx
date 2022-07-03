import {
  Avatar,
  Button,
  Drawer,
  GeistUIThemes,
  Text,
  useMediaQuery,
  useTheme,
} from '@geist-ui/core'
import { Edit, Menu } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React, { FC, useCallback, useState } from 'react'
import { $currentUser } from '~/entities/session'
import { showTaskForm } from '~/entities/task'
import { FavoriteAdd } from '~/features/project/favorite/ui'
import { projectRoute } from '../route'

const ButtonStyled = styled(Button)`
  z-index: 1500;

  position: fixed;
  top: 0;
  left: -15px;
`

export const Header = () => {
  const [isOpen, setOpen] = useState(false)
  const params = useStore(projectRoute.$params)

  const theme = useTheme()
  const mdDown = useMediaQuery('md', { match: 'down' })

  const toggle = () => setOpen((current) => !current)
  const close = () => setOpen(false)

  return (
    <Container theme={theme}>
      {mdDown && <ButtonStyled type="abort" auto scale={0.8} icon={<Menu />} onClick={toggle} />}
      <Text mr={0.4}>Board</Text>
      <FavoriteAdd projectID={params.id} />
      <Sidebar isOpen={isOpen} onClose={close} />
    </Container>
  )
}

const Container = styled.header<{ theme: GeistUIThemes }>`
  position: relative;

  min-height: 57px;

  display: flex;
  align-items: center;
  padding: 0 53px 0 23px;

  border-bottom: 1px solid ${({ theme }) => theme.palette.border};
`

const Sidebar: FC<{ isOpen: boolean; onClose(): void }> = ({ isOpen, onClose }) => {
  const viewer = useStore($currentUser)
  const handleClick = useCallback(() => {
    onClose()
    showTaskForm()
  }, [])

  return (
    <Drawer width="55%" visible={isOpen} placement="left" onClose={onClose}>
      <Drawer.Content pb={0.6}>
        <UserPanel>
          <Avatar mr={0.4} text="MI" isSquare />
          <ProjectTitle font="14px">Mirio</ProjectTitle>
          <Avatar src={viewer?.photoUrl} />
        </UserPanel>
        <Button
          ghost
          type="secondary"
          scale={0.6}
          width="100%"
          icon={<Edit />}
          onClick={handleClick}
        >
          New task
        </Button>
      </Drawer.Content>
    </Drawer>
  )
}

const UserPanel = styled.div`
  margin-top: 0.4rem;

  display: flex;
  align-items: center;

  margin-bottom: 0.6rem;
`

const ProjectTitle = styled(Text)`
  flex: 1 0 auto;
`
