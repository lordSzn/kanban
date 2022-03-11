import { Input } from '@geist-ui/core'
import React, { EventHandler, SyntheticEvent } from 'react'

interface Props {
  label: string
  placeholder?: string
  onChange: EventHandler<SyntheticEvent>
  value?: string
}

export const ControlField = ({ label, placeholder, value, onChange }: Props) => {
  return (
    <Input width="100%" onChange={onChange} value={value} placeholder={placeholder}>
      {label}
    </Input>
  )
}
