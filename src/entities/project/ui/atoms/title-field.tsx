import { useStore } from 'effector-react'
import React from 'react'
import { TextField } from '~/shared/ui/atoms/input'
import { title } from '../../index'

export const TitleField = () => {
  const failure = useStore(title.$errors)
  const error = useStore(title.$hasErrors)
  const titleText = useStore(title.$value)

  return (
    <>
      <TextField
        width="100%"
        value={titleText}
        error={error}
        placeholder="Project title"
        helperText={failure.map(({ message }) => message).join(' ')}
        onChange={(e) => title.changed(e.target.value)}
      />
    </>
  )
}
