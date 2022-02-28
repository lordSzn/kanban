import { reflect } from '@effector/reflect'
import { Button, useTheme } from '@geist-ui/core'
import { Moon, Sun } from '@icon-park/react'
import React, { FormEventHandler } from 'react'
import { $isDark, themeToggled } from '../..'

interface Props {
  isDark?: boolean
  onClick?: FormEventHandler<unknown>
}

export const SwitchThemeBase = ({ isDark, onClick }: Props) => {
  const theme = useTheme()
  const icon = isDark ? <Moon /> : <Sun />
  return (
    <Button
      auto
      type="abort"
      icon={icon}
      scale={0.8}
      onClick={onClick}
      color={theme.palette.foreground}
    />
  )
}

export const SwitchTheme = reflect({
  view: SwitchThemeBase,
  bind: {
    isDark: $isDark,
    onClick: () => themeToggled(),
  },
})
