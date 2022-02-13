import { CssBaseline, GeistProvider } from '@geist-ui/core'
import { useStore } from 'effector-react'
import React from 'react'
import { $theme } from '../features/theme'
import { Main } from '../pages'

export const Application = () => {
  const theme = useStore($theme)
  return (
    <>
      <GeistProvider themeType={theme}>
        <CssBaseline />
        <Main />
      </GeistProvider>
    </>
  )
}
