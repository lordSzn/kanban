import { Avatar, Tooltip } from '@geist-ui/core'
import React from 'react'
import { useDropzone } from 'react-dropzone'

export const UserUploadImage = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
  })
  return (
    <div>
      <Tooltip type="dark" text="Click to upload photo" placement="bottom" trigger="hover">
        <label {...getRootProps()}>
          <Avatar scale={7.6} />
        </label>
        <input {...getInputProps()} />
      </Tooltip>
    </div>
  )
}
