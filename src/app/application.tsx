import { CssBaseline, GeistProvider } from '@geist-ui/core'
import { RouterProvider } from 'atomic-router-react'
import { useStore } from 'effector-react'
import 'keen-slider/keen-slider.min.css'
import React, { useEffect } from 'react'
import { $theme } from '~/features/theme'
import { initFirebase } from '~/shared/config/init-firebase'
import { appStarted } from '~/shared/config/run-logic'
import { ToastProvider } from '~/shared/lib/toast'
import { config } from './firebase-config'
import { Pages, router } from './routing'

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
      <RouterProvider router={router}>
        <GeistProvider themeType={theme}>
          <ToastProvider />
          <Pages />
          <CssBaseline />
        </GeistProvider>
      </RouterProvider>
    </>
  )
}
