import { useTheme } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React, { CSSProperties, FC } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'

interface Props {
  className?: string
  accept?: DropzoneOptions['accept']
  minSize?: DropzoneOptions['minSize']
  maxSize?: DropzoneOptions['maxSize']
  maxFiles?: DropzoneOptions['maxFiles']
  multiple?: DropzoneOptions['multiple']
  onDrop?: DropzoneOptions['onDrop']
  validator?: DropzoneOptions['validator']
  centred?: boolean
}

const DragUploadBase: FC<Props> = ({
  accept,
  className,
  maxFiles,
  maxSize,
  minSize,
  onDrop,
  multiple,
  validator,
  children,
  centred = true,
}) => {
  const theme = useTheme()

  const { getRootProps, getInputProps, isDragAccept, isFocused } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop,
    multiple,
    validator,
  })

  const styles: CSSProperties = {
    border: `1px dashed ${theme.palette.border}`,
    borderRadius: theme.layout.radius,
    backgroundColor: theme.palette.accents_1,
    transition: 'border 0.2s ease 0s, color 0.2s ease 0s',
  }

  return (
    <div className={className} {...getRootProps()}>
      <DropArea
        style={styles}
        data-centred={centred}
        data-focus={isFocused}
        data-accept={isDragAccept}
      >
        {children}
      </DropArea>
      <input data-element="file" {...getInputProps()} />
    </div>
  )
}

export const DragUpload = styled(DragUploadBase)`
  height: 270px;
  &[data-element='file'] {
    display: none;
  }
`

const DropArea = styled.div`
  cursor: pointer;

  height: 100%;
  width: 100%;

  &[data-accept='true'] {
    border-color: #00e676 !important;
  }

  &[data-focus='true'] {
    border-color: #666 !important;
  }

  &[data-centred='true'] {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
