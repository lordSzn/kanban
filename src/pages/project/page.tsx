import { variant } from '@effector/reflect'
import { Grid, Loading, Modal, Spacer } from '@geist-ui/core'
import { useStore } from 'effector-react'
import React from 'react'
import { $isOpenForm, hideTaskForm, taskSave } from '~/entities/task'
import { Create, DescriptionField, TitleField } from '~/entities/task/ui'
import { BoardsBaseStructs } from '~/features/task/control-task-lifecycle/ui'
import { BaseTemplate } from '~/shared/ui'
import { $pending } from './model'
import { Header } from './ui/header'

const Content = variant({
  source: $pending.map((pending) => (pending ? 'loading' : 'started')),
  cases: {
    loading: () => <Loading />,
    started: () => <Boards />,
  },
})

export const Project = () => {
  return (
    <BaseTemplate header={<Header />}>
      <Content />
    </BaseTemplate>
  )
}

export const CreateTaskModal = () => {
  const isOpen = useStore($isOpenForm)
  return (
    <Modal visible={isOpen} onClose={hideTaskForm}>
      <Modal.Title>Create task</Modal.Title>
      <Modal.Content>
        <TitleField />
        <Spacer h={0.6} />
        <DescriptionField />
      </Modal.Content>
      <Modal.Action onClick={() => hideTaskForm()} passive>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={() => taskSave()}>Submit</Modal.Action>
    </Modal>
  )
}

export const Boards = () => {
  return (
    <Grid.Container gap={10} justify="center" height="100px">
      <BoardsBaseStructs extra={<Create />} />
      <CreateTaskModal />
    </Grid.Container>
  )
}
