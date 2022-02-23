import { Button, Grid, Input, Keyboard, Text } from '@geist-ui/core'
import { ApplicationMenu } from '@icon-park/react'
import { styled } from '@linaria/react'
import React from 'react'
import { UserCard } from '~/entities/user/ui'

export const Header = () => {
  return (
    <Grid.Container gap={3} height="60px" justify="center" alignItems="center">
      <Grid xs={10} alignItems="center">
        <ButtonMenu onClick={console.log}>
          <ApplicationMenu />
        </ButtonMenu>
        <Text h2>Mirio</Text>
      </Grid>
      <Grid xs={3}>
        <Input scale={1} iconRight={<Keyboard ctrl />} placeholder="Search" />
      </Grid>
      <Grid xs={2} alignItems="center">
        <Button type="secondary" ghost auto scale={0.6}>
          Create project
        </Button>
      </Grid>
      <Grid xs={3} alignItems="center">
        <UserCard fullname="robert kuzhin" />
      </Grid>
    </Grid.Container>
  )
}

const ButtonMenu = styled.button`
  cursor: pointer;
  margin-right: 1rem;
  background: transparent;
  padding: 0;
  outline: none;
  border: none;
`
