import { CssBaseline, GeistProvider } from '@geist-ui/core'
import { sample } from 'effector'
import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { $theme } from '../features/theme'
import { Main } from '../pages'
import { appStarted } from '../shared/config/run-logic'
import { startFirebase } from './init-firebase'

sample({
  source: appStarted,
  target: startFirebase,
})

export const Application = () => {
  const theme = useStore($theme)

  useEffect(() => {
    appStarted()
  }, [])

  return (
    <>
      <GeistProvider themeType={theme}>
        <CssBaseline />
        <Main />
      </GeistProvider>
    </>
  )
}
