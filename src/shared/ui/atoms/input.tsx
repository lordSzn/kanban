/* eslint-disable react/jsx-props-no-spreading */
import { Dot, Input, Text } from '@geist-ui/core'
import React, {
  EventHandler,
  InputHTMLAttributes,
  ReactNode,
  SyntheticEvent,
  useState,
} from 'react'

type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'>

export type InputProps = BaseInputProps & {
  autoComplete?: 'on' | 'off'
  iconRight?: ReactNode
  icon?: ReactNode
  onBlur?: EventHandler<SyntheticEvent>
  error?: boolean
  helperText?: string
  value?: string
  type?: 'error' | 'default' | 'secondary' | 'success' | 'warning'
}

export const TextField = ({
  autoComplete,
  iconRight,
  icon,
  onBlur,
  error,
  helperText,
  value,
  type,
  ...attributes
}: InputProps & BaseInputProps) => {
  const [isTouched, setTouched] = useState(false)

  const hasError = error && isTouched
  const fieldType = hasError ? 'error' : type

  return (
    <Input
      type={fieldType}
      value={value}
      icon={icon}
      iconRight={iconRight}
      autoComplete={autoComplete}
      onBlur={(e) => {
        setTouched(true)
        if (onBlur) {
          onBlur(e)
        }
      }}
      {...attributes}
    >
      {hasError && (
        <Dot type="warning">
          <Text small>{helperText}</Text>
        </Dot>
      )}
    </Input>
  )
}
