import { styled } from '@linaria/react'
import React from 'react'
import { ProjectPreview } from '../../entities/project/ui'
import { appStarted } from '../../shared/config/run-logic'
import { showMessage } from '../../shared/lib/toast'
import { BaseTemplate } from '../../shared/ui'
import { Header } from '../../widgets/header'

showMessage({
  when: appStarted,
  toast: () => ({
    type: 'success',
    text: 'Welcome in main page',
    delay: 2000,
  }),
})

export const Main = () => {
  return (
    <BaseTemplate header={<Header />}>
      <Container>
        {Array.from({ length: 4 }, (_, i) => (
          <ProjectPreview key={i} />
        ))}
      </Container>
    </BaseTemplate>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
