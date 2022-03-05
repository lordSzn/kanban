import { Toggle, useTheme, Text } from '@geist-ui/core'
import { Moon, Sun } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import React from 'react'

interface Props {
  toggleTheme(): void
}
// @fix semantic use label with htmlFor
export const SwitchTheme = ({ toggleTheme }: Props) => {
  const theme = useTheme()
  const isDark = theme.type === 'dark'
  const icon = isDark ? <Moon /> : <Sun />

  return (
    <Button onClick={() => toggleTheme()}>
      <span data-element="icon">{icon}</span>
      <Container>
        <Text span>Dark Side</Text>
        <Toggle scale={1.5} checked={isDark} />
      </Container>
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  align-items: center;

  max-width: 100%;
  max-height: 100%;

  width: 100%;
  height: 2.8rem;

  background-color: transparent;
  border: none;

  border-radius: 0.3rem;

  & > [data-element='icon'] {
    padding-right: 1.3rem;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 100%;
  max-height: 100%;

  height: 100%;
  width: 100%;
`
