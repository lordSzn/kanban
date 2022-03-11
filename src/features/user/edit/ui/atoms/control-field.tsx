import { Input } from '@geist-ui/core'
import React, { ChangeEvent } from 'react'

interface Props {
  label: string
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string
  htmlType: string
}

export const ControlField = ({ label, placeholder, value, onChange, htmlType }: Props) => {
  return (
    <Input
      htmlType={htmlType}
      width="100%"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    >
      {label}
    </Input>
  )
}
