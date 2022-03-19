import { Grid } from '@geist-ui/core'
import { styled } from '@linaria/react'
import React from 'react'
import { checkAuthenticated, redirectSessionFailure } from '~/entities/session'
import { userEditRoute } from '~/features/user/edit'
import { UserEditForm } from '~/features/user/edit/ui'
import { Sidebar } from '~/widgets/sidebar'

checkAuthenticated({
  when: userEditRoute.opened,
  if: 'anonymous',
  then: redirectSessionFailure,
})

export const Settings = () => {
  return (
    <Grid.Container height="100vh">
      <Grid xs={4} width="100%">
        <Sidebar />
      </Grid>
      <Grid xs={20} justify="center">
        <Main>
          <UserEditForm />
        </Main>
      </Grid>
    </Grid.Container>
  )
}

const Main = styled.section`
  padding-top: 4rem;

  max-width: 37rem;
  width: 100%;
`
