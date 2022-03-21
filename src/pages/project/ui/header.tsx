import { CornerUpLeft } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import React from 'react'
import { paths } from '~/shared/lib/paths'
import { CustomLink } from '~/shared/ui'

export const Header = () => {
  return (
    <Container>
      <CustomLink to={paths.workspace()} iconLeft={<CornerUpLeft />}>
        Back to workspace
      </CustomLink>
    </Container>
  )
}

const Container = styled.header`
  min-height: 4rem;
  display: flex;
  align-items: center;
`
