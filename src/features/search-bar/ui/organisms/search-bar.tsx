import { KeyCode, KeyMod, useKeyboard, Input } from '@geist-ui/core'
import { Search } from '@icon-park/react'
import React, { useLayoutEffect, useRef } from 'react'
import { addFieldRef, focusSearchField } from '../..'

export const SearchBar = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    addFieldRef(ref)
  }, [])

  useKeyboard(() => {
    focusSearchField()
  }, [KeyMod.CtrlCmd, KeyCode.KEY_K])

  return (
    <>
      <Input
        scale={1.2}
        ref={ref}
        mr={1.2}
        clearable
        className={className}
        icon={<Search />}
        placeholder="Search..."
      />
    </>
  )
}
