import { Select, useTheme } from '@geist-ui/core'
import { Moon, Sun } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import React from 'react'
import { themeChoice } from '../../model'

export const ThemeChoice = () => {
  const theme = useTheme()

  return (
    <Select
      style={{ minWidth: '93px', width: '90px' }}
      scale={0.5}
      h="28px"
      pure
      value={theme.type}
      title="Choice theme"
      onChange={themeChoice}
    >
      <Select.Option value="light">
        <SelectContainer>
          <Sun data-element="icon" size={14} />
          <div>Light</div>
        </SelectContainer>
      </Select.Option>
      <Select.Option value="dark">
        <SelectContainer>
          <Moon data-element="icon" size={14} />
          <div>Dark</div>
        </SelectContainer>
      </Select.Option>
    </Select>
  )
}

const SelectContainer = styled.span`
  width: 100%;
  height: 18px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & > [data-element='icon'] {
    margin: 0 10px 0 2px;
  }
`
