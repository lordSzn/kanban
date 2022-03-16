import { Button, Grid, Link, Text } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React from 'react'
import { BaseTemplate } from '~/shared/ui'

export const NotFound = () => {
  return (
    <BaseTemplate header={<Header />}>
      <Preview>
        <HeroTitle>Page not found</HeroTitle>
      </Preview>
    </BaseTemplate>
  )
}

export const Header = () => {
  return (
    <Grid.Container gap={2} alignItems="center">
      <Grid xs={9}>
        <Text h2>Mirio</Text>
      </Grid>
      <Grid xs={6} justify="space-between">
        <Link>Contact</Link>
        <Link>Open source</Link>
        <Link>Effector</Link>
        <Link>Geist ui</Link>
      </Grid>
      <Grid xs={9} justify="flex-end">
        <Button type="abort" auto scale={0.897}>
          Login
        </Button>
        <Button type="secondary" auto scale={0.897}>
          Try mirio
        </Button>
      </Grid>
    </Grid.Container>
  )
}

const HeroTitle = styled.span`
  font-size: 72px;
  font-weight: 800;

  margin-top: 10rem;
`

const Preview = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
`
