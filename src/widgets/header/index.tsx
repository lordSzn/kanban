import { Button, Grid, Input, Keyboard, Text } from '@geist-ui/core'
import { ApplicationMenu } from '@icon-park/react'
import { styled } from '@linaria/react'
import React from 'react'
import { UserCard } from '~/entities/user/ui'

export const Header = () => {
  return (
    <HeaderContainer>
      <Grid.Container height="100%" justify="center" alignItems="center">
        <Grid xs={12} margin="0" height="100%">
          <ButtonMenu onClick={console.log}>
            <ApplicationMenu />
          </ButtonMenu>
          <Text h2>Mirio</Text>
        </Grid>
        <Grid xs={3}>
          <Input scale={1} iconRight={<Keyboard ctrl />} placeholder="Search" />
        </Grid>
        <Grid xs={2}>
          <Button type="secondary" ghost auto scale={0.6}>
            Create project
          </Button>
        </Grid>
        <Grid xs={3}>
          <UserCard fullname="robert kuzhin" />
        </Grid>
      </Grid.Container>
    </HeaderContainer>
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

const HeaderContainer = styled.header`
  width: 100%;
  box-shadow: 0 0 15px 0 rgb(0 0 0 / 10%);
  height: 60px;
`
