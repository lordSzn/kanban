import { Button, ButtonProps } from '@geist-ui/core'
import React, { ReactNode } from 'react'

interface Props {
  icon?: ReactNode
  onClick?(): void
  label: string
}

export const ButtonControl = ({ icon, onClick, label, type }: Props & ButtonProps) => {
  return (
    <Button type={type} icon={icon} mb={0.89} shadow width="100%" onClick={onClick}>
      {label}
    </Button>
  )
}
