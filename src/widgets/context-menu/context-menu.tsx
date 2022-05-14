import { Copy, Edit2, Link, Trash2 } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import React from 'react'

const Divider = () => {
  return (
    <DividerContainer>
      <Line />
    </DividerContainer>
  )
}

const DividerContainer = styled.div`
  padding: 5px 0;
`

const Line = styled.div`
  background: rgba(147, 163, 184, 0.3);
  height: 1px;
`

export const ContextMenu = () => {
  return (
    <Container>
      <MenuGroup>
        <MenuItem>
          <Edit2 size={17} color="var(--currentColor)" />
          <ItemLabel>Change</ItemLabel>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Link size={17} color="var(--currentColor)" />
          <ItemLabel>Copy link</ItemLabel>
        </MenuItem>
        <MenuItem>
          <Copy size={17} color="var(--currentColor)" />
          <ItemLabel>Duplicate</ItemLabel>
        </MenuItem>
      </MenuGroup>
      <Divider />
      <MenuGroup>
        <MenuItem>
          <Trash2 size={17} color="var(--currentColor)" />
          <ItemLabel>Delete</ItemLabel>
        </MenuItem>
      </MenuGroup>
    </Container>
  )
}

const Container = styled.div`
  padding: 0;
  width: 230px;
`

const MenuGroup = styled.div`
  padding: 0 3px;
`

const MenuItem = styled.button`
  --currentColor: #8b5cf6;
  transition: background 0.1s ease-in;

  border: none;
  background: transparent;
  color: #111827;

  width: 100%;
  padding: 7px;

  display: flex;
  align-items: center;
  border-radius: 6px;

  &:hover {
    --currentColor: #fff;

    color: #fff;
    background: #8b5cf6;
  }
`

const ItemLabel = styled.span`
  margin-left: 8px;
  font-size: 14px;
`
