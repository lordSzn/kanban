import { createEffect, createStore, sample, split } from 'effector'
import { appStarted } from '../../shared/config/run-logic'

type Theme = 'light' | 'dark'

export const getSaveThemeFx = createEffect<void, string | null>({
  handler: async () => {
    const theme = window.localStorage.getItem('ui-theme')

    return theme
  },
})

export const getSystemThemeFx = createEffect<void, Theme>({
  handler: async () => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    return isDark ? 'dark' : 'light'
  },
})

sample({
  clock: appStarted,
  target: getSaveThemeFx,
})

const { loadSaveTheme, __: loadSystemTheme } = split(getSaveThemeFx, {
  loadSaveTheme: (theme) => Boolean(theme),
})

sample({
  clock: loadSaveTheme,
  target: getSystemThemeFx,
})

export const $theme = createStore<Theme>('light')
  .on(loadSystemTheme, (_, theme) => theme)
  .on(getSystemThemeFx.doneData, (_, theme) => theme)

$theme.watch((theme) => {
  if (!theme) {
    return window.localStorage.removeItem('ui-theme')
  }
  window.localStorage.setItem('ui-theme', theme)
})
