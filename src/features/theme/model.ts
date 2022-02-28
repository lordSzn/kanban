import { createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

type Theme = 'light' | 'dark'

export const themeToggled = createEvent()
export const $theme = createStore<Theme>('light')

export const $isDark = $theme.map((theme) => theme === 'dark')

persist({
  store: $theme,
  key: 'ui-theme',
})

sample({
  clock: themeToggled,
  source: $theme,
  fn: (theme) => (theme === 'light' ? 'dark' : 'light'),
  target: $theme,
})
