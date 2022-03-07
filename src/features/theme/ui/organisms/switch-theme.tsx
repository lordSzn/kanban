import { Text, GeistUIThemes } from '@geist-ui/core'
import { Moon, Sun } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import React from 'react'
import { themeToggled } from '../../model'

interface Props {
  className?: string
  theme: GeistUIThemes
}

export const SwitchTheme = ({ className, theme }: Props) => {
  const isDark = theme.type === 'dark'
  const icon = isDark ? <Moon /> : <Sun />
  return (
    <SwitchContainer className={className} theme={theme}>
      <label data-element="label" htmlFor="toggler-theme">
        <span data-element="icon">{icon}</span>
        <Text data-element="text">Dark mode</Text>
        <div data-element="switcher" data-checked={isDark}>
          <div className="inner213" data-element="inner" />
        </div>
      </label>
      <input
        type="checkbox"
        data-element="input"
        id="toggler-theme"
        name="switch-toggler-themes"
        onChange={() => themeToggled()}
      />
    </SwitchContainer>
  )
}

const SwitchContainer = styled.div<Props>`
  width: 100%;

  transition-delay: 0.12s;
  transition-duration: 0.2s;
  transition-property: background, border;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

  border: 1px solid transparent;
  padding: 0;

  & > [data-element='label'] {
    width: 100%;

    display: flex;
    align-items: center;

    cursor: pointer;
  }

  & > [data-element='label'] > [data-element='text'] {
    flex: 1 0;
  }

  & > [data-element='label'] [data-element='icon'] {
    margin-right: 1rem;
  }

  & > [data-element='input'] {
    overflow: hidden;
    visibility: hidden;
    height: 0;
    opacity: 0;
    width: 0;
    position: absolute;
    background-color: transparent;
    z-index: -1;
  }

  & > [data-element='label'] [data-element='switcher'] {
    height: 21px;
    width: 44px;

    border-radius: 27px;

    transition-delay: 0.12s;
    transition-duration: 0.2s;
    transition-property: background, border;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

    position: relative;
    border: 1px solid transparent;

    background-color: ${({ theme }) => theme.palette.accents_2};
    padding: 0;
  }

  & > [data-element='label'] [data-element='switcher'] [data-element='inner'] {
    width: 18px;
    height: 18px;

    position: absolute;
    top: 50%;

    transform: translateY(-50%);
    left: 1px;
    box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0, rgba(0, 0, 0, 0.1) 0 1px 3px 0;
    transition: left 280ms cubic-bezier(0, 0, 0.2, 1);
    border-radius: 50%;

    background-color: ${({ theme }) => theme.palette.background};
  }

  & > [data-element='label'] [data-checked='true'] {
    background-color: ${({ theme }) => theme.palette.success};
  }

  & > [data-element='label'] [data-checked='true'] [data-element='inner'] {
    left: calc(100% - 19px);
    box-shadow: none;
  }
`
