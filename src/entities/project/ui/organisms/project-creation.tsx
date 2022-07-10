import { reflect } from '@effector/reflect'
import { Button, Divider, Modal, Spacer, Text, Image } from '@geist-ui/core'
import { FilePlus } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { DragUpload } from '~/shared/ui'
import { $photoUrl, $saveProjectLoading, formSubmitted, photo, photoUploaded } from '../../model'
import { ChoiceTag, DescriptionField, TitleField } from '../atoms'

interface Props {
  visible: boolean
  close(): void
}

export const ProjectCreationForm: FC<Props> = ({ visible, close }) => {
  return (
    <Modal height="870px" width="800px" visible={visible} onClose={close}>
      <Modal.Title>Mirio</Modal.Title>
      <Modal.Content>
        <TitleField />
        <Spacer h={1.2} />
        <DescriptionField />
        <Spacer h={1.2} />
        <ChoiceTag />
        <Spacer h={1.2} />
        <PhotoUploadPreview />
      </Modal.Content>
      <ModalActions>
        <Divider />
        <ButtonGroup>
          <Button width="70px" mr={0.4} onClick={() => close()}>
            cancel
          </Button>
          <Submitted>submit</Submitted>
        </ButtonGroup>
      </ModalActions>
    </Modal>
  )
}

const PhotoUploadPreview = () => {
  const photoUrl = useStore($photoUrl)
  return (
    <DragUpload maxFiles={1} onDrop={(files) => photoUploaded(files[0])}>
      <DragGroup>
        {photoUrl ? (
          <Image src={photoUrl} margin="0" width="200px" height="200px" />
        ) : (
          <>
            <FilePlus size={140} />
            <Text>Drop your photo, here to start uploading</Text>
          </>
        )}
      </DragGroup>
    </DragUpload>
  )
}

const Submitted = reflect({
  view: Button,
  bind: {
    type: 'success',
    width: '70px',
    loading: $saveProjectLoading,
    disabled: $saveProjectLoading,
    onClick: formSubmitted.prepend(() => ({})),
  },
})

const ModalActions = styled.div`
  overflow: hidden;
  width: 100%;
  padding-top: 11rem;
`

const ButtonGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`

const DragGroup = styled.div`
  text-align: center;
`
