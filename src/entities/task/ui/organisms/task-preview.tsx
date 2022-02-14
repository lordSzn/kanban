import { css } from '@linaria/core'
import React, { FC } from 'react'

interface Props {
  title: string
  description: string
}

export const TaskPreview: FC<Props> = () => {
  return (
    <>
      <div className={container}>hello</div>
    </>
  )
}

const container = css`
  color: red;
`
