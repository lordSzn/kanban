import { Text } from '@geist-ui/core'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { Link } from 'atomic-router-react'
import { createStore } from 'effector'
import { useList } from 'effector-react'
import React from 'react'
import { Theme } from '~/features/theme'
import { menuSettings } from './menu-lists'

export const $menuList = createStore(menuSettings)

export const SettingsMenu = ({ type }: { type: Theme }) =>
  useList($menuList, (menu, idx) => {
    const icon = menu.icon
    const title = <Text ml={0.35}>{menu.label}</Text>

    const menuItems = (
      <>
        {menu.items.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <SettingItem key={idx}>
            <Link
              data-theme={type}
              className={linkClasses}
              activeClassName={activeLinkClasses}
              to={item.href}
            >
              {item.name}
            </Link>
          </SettingItem>
        ))}
      </>
    )

    return (
      <div key={idx}>
        <SettingsLabel>
          {icon}
          {title}
        </SettingsLabel>
        {menuItems}
      </div>
    )
  })

const SettingsLabel = styled.div`
  display: flex;
  align-items: center;

  height: 2rem;
`

const SettingItem = styled.div`
  margin: 1px;

  padding: 0;

  width: 100%;
  height: 100%;

  &:last-child {
    margin-bottom: 2rem;
  }
`

const linkClasses = css`
  display: block;

  padding: 0.5rem 0 0.5rem 1.8rem;

  border-radius: 7px;

  cursor: pointer;
  transition: background 0.2s cubic-bezier(0.33, 0.96, 0.49, 1.01);

  &:hover {
    background-color: rgba(234, 234, 234, 0.5);
  }

  &[data-theme='dark'] {
    color: inherit;
  }
`

const activeLinkClasses = css`
  background-color: rgba(234, 234, 234, 0.5);
`
