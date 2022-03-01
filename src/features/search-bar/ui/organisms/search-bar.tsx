import { KeyCode, KeyMod, useKeyboard, Input } from '@geist-ui/core'
import React, { useLayoutEffect, useRef } from 'react'
import { addFieldRef, focusSearchField } from '../..'

export const SearchBar = () => {
  const ref = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    addFieldRef(ref)
  }, [])

  useKeyboard(() => {
    focusSearchField()
  }, [KeyMod.CtrlCmd, KeyCode.KEY_K])

  return (
    <Input
      width="300px"
      ref={ref}
      clearable
      labelRight="Ctrl K"
      placeholder="Search..."
    />
  )
}
