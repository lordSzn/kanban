import { Page } from '@geist-ui/core'
import React, { FC, ReactNode } from 'react'

interface Props {
  header?: ReactNode
  footer?: ReactNode
}

export const BaseTemplate: FC<Props> = ({ header, footer, children }) => {
  return (
    <Page>
      <Page.Header>{header}</Page.Header>
      <Page.Content>{children}</Page.Content>
      {footer && <Page.Footer>{footer}</Page.Footer>}
    </Page>
  )
}
