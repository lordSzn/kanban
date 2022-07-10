import { Dot, Text, Textarea } from '@geist-ui/core'
import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { description } from '../..'

export const DescriptionField = () => {
  const [isTouched, setTouched] = useState(false)

  const descriptionText = useStore(description.$value)
  const failure = useStore(description.$errors)
  const hasError = isTouched && failure.length > 0

  return (
    <>
      {hasError && (
        <Dot type="warning">
          <Text small>{failure.map(({ message }) => message).join('')}</Text>
        </Dot>
      )}
      <Textarea
        type={hasError ? 'error' : 'default'}
        width="100%"
        placeholder="Project description"
        value={descriptionText}
        onBlur={() => setTouched(true)}
        onChange={(e) => description.changed(e.target.value)}
      />
    </>
  )
}
