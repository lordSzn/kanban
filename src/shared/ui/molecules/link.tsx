import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { Link } from 'atomic-router-react'
import React, { FC, ReactNode } from 'react'
import type { GetProps } from '~/shared/lib/get-props'

interface PropsBase {
  className?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

type LinkProps = GetProps<typeof Link>

export const CustomLink: FC<PropsBase & LinkProps> = ({
  className,
  iconLeft,
  iconRight,
  activeClassName,
  children,
  to,
}) => {
  return (
    <Container className={className}>
      <Link className={link} to={to} activeClassName={activeClassName}>
        {iconLeft && (
          <span data-element="icon" data-icon="left">
            {iconLeft}
          </span>
        )}
        {children}
        {iconRight && (
          <span data-element="icon" data-icon="right">
            {iconRight}
          </span>
        )}
      </Link>
    </Container>
  )
}

const Container = styled.div`
  cursor: pointer;
  padding: 0;
`

const link = css`
  &[data-element='icon'] {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > [data-icon='left'] {
    margin-right: 0.5rem;
  }

  & > [data-icon='right'] {
    margin-left: 0.5rem;
  }
`
