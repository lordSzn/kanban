import { Avatar, Tooltip } from '@geist-ui/core'
import React, { FC } from 'react'
import { useDropzone } from 'react-dropzone'

interface Props {
  src?: string
}

export const UserUploadImage: FC<Props> = ({ src }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
  })

  return (
    <div>
      <Tooltip type="dark" text="Click to upload photo" placement="bottom" trigger="hover">
        <label {...getRootProps()}>
          <Avatar src={src} scale={7.6} />
        </label>
        <input {...getInputProps()} />
      </Tooltip>
    </div>
  )
}
