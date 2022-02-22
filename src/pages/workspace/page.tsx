import { Loading } from '@geist-ui/core'
import { styled } from '@linaria/react'
import { useStore } from 'effector-react'
import React from 'react'
import { ProjectList } from '~/entities/project/ui'
import { BaseTemplate } from '../../shared/ui'
import { Header } from '../../widgets/header'
import { $pending } from './model'

export const Workspace = () => {
  const loading = useStore($pending)

  if (loading) {
    return <Loading>loading</Loading>
  }
  return (
    <BaseTemplate header={<Header />}>
      <Container>
        <ProjectList />
      </Container>
    </BaseTemplate>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
