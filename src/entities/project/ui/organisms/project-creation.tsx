import { Button, Divider, Image, Modal, Spacer, Text } from '@geist-ui/core'
import { Dropbox } from '@icon-park/react'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { DragUpload } from '~/shared/ui'
import {
  $description,
  $photoUrl,
  $saveProjectLoading,
  $title,
  formSubmitted,
  photoUploaded,
} from '../../model'
import { ChoiceTag, DescriptionField, TitleField } from '../molecules'

interface Props {
  visible: boolean
  close(): void
}

export const ProjectCreationForm: FC<Props> = ({ visible, close }) => {
  const title = useStore($title)
  const description = useStore($description)
  const loading = useStore($saveProjectLoading)
  const photoUrl = useStore($photoUrl)
  return (
    <Modal height="870px" width="800px" visible={visible} onClose={close}>
      <Modal.Title>Mirio</Modal.Title>
      <Modal.Content>
        <TitleField title={title} />
        <Spacer h={1.2} />
        <DescriptionField description={description} />
        <Spacer h={1.2} />
        <ChoiceTag />
        <Spacer h={1.2} />
        <DragUpload maxFiles={1} onDrop={(file) => photoUploaded(file)}>
          <DragGroup>
            {photoUrl ? (
              <Image src={photoUrl} margin="0" width="200px" height="200px" />
            ) : (
              <>
                <Dropbox size={140} />
                <Text>Drop your photo, here to start uploading</Text>
              </>
            )}
          </DragGroup>
        </DragUpload>
      </Modal.Content>
      <ModalActions>
        <Divider />
        <ButtonGroup>
          <Button width="70px" mr={0.4} onClick={() => close()}>
            cancel
          </Button>
          <Button
            type="success"
            loading={loading}
            width="70px"
            onClick={() => formSubmitted}
          >
            submit
          </Button>
        </ButtonGroup>
      </ModalActions>
    </Modal>
  )
}

const ModalActions = styled.div`
  overflow: hidden;
  width: 100%;
  padding-top: 12rem;
`

const ButtonGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`

const DragGroup = styled.div`
  text-align: center;
`
