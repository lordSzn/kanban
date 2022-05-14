import { styled } from '@linaria/react'
import React from 'react'

const DividerContainer = styled.div`
  padding: 5px 0;
`

const Line = styled.div`
  background: rgba(147, 163, 184, 0.3);
  height: 1px;
`

export const Divider = () => {
  return (
    <DividerContainer>
      <Line />
    </DividerContainer>
  )
}

export const Content = styled.div`
  padding: 0;
  width: 230px;
`

export const MenuGroup = styled.div`
  padding: 0 3px;
`

export const MenuItem = styled.button`
  --currentColor: #8b5cf6;
  transition: background 0.1s ease-in;

  border: none;
  background: transparent;

  width: 100%;
  padding: 7px;

  display: flex;
  align-items: center;
  border-radius: 6px;

  & > span {
    margin-left: 8px;
    font-size: 14px;
  }

  &:hover {
    --currentColor: #fff;

    color: #fff;
    background: #8b5cf6;
  }
`
