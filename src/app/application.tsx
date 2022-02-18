import { CssBaseline, GeistProvider } from '@geist-ui/core'
import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { $theme } from '../features/theme'
import { Main } from '../pages'
import { initFirebase } from '../shared/config/init-firebase'
import { appStarted } from '../shared/config/run-logic'
import { config } from './firebase-config'

initFirebase({
  config,
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
