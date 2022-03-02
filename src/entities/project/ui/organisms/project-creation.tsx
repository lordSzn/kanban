import { Input, Modal, Spacer, Text, Textarea } from '@geist-ui/core'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { ChoiceTag } from '..'
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

export const ProjectCreationForm: FC<Props> = ({ visible, close }) => {
  const title = useStore($title)
  const description = useStore($description)
  const loading = useStore($saveProjectLoading)
  return (
    <Modal height="870px" width="800px" visible={visible} onClose={close}>
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
        <Textarea
          width="100%"
          value={description}
          onChange={(e) => descriptionChanged(e.target.value)}
        />
        <Spacer h={1.2} />
        <ChoiceTag />
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
