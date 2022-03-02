import { Input, Modal, Spacer, Text } from '@geist-ui/core'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import {
  $description,
  $saveProjectLoading,
  $title,
  descriptionChanged,
  formSubmitted,
  titleChanged,
} from '../..'

interface Props {
  visible: boolean
  close(): void
}

export const ProjectCreate: FC<Props> = ({ visible, close }) => {
  const title = useStore($title)
  const description = useStore($description)
  const loading = useStore($saveProjectLoading)
  return (
    <Modal visible={visible} onClose={close}>
      <Modal.Title>Create project</Modal.Title>
      <Modal.Content>
        <Input
          width="100%"
          value={title}
          placeholder="title"
          onChange={(e) => titleChanged(e.target.value)}
        >
          <Text>Title</Text>
        </Input>
        <Spacer h={1.2} />
        <Input
          width="100%"
          value={description}
          placeholder="description"
          onChange={(e) => descriptionChanged(e.target.value)}
        >
          <Text>Description</Text>
        </Input>
      </Modal.Content>
      <Modal.Action passive onClick={close}>
        Cancel
      </Modal.Action>
      <Modal.Action loading={loading} onClick={() => formSubmitted()}>
        Submit
      </Modal.Action>
    </Modal>
  )
}
