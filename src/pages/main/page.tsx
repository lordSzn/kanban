import { styled } from '@linaria/react'
import { createEvent } from 'effector'
import React, { useEffect } from 'react'
import { ProjectPreview } from '../../entities/project/ui'
import { showMessage } from '../../shared/lib/toast'
import { BaseTemplate } from '../../shared/ui'
import { Header } from '../../widgets/header'

const pageMounted = createEvent()

showMessage({
  when: pageMounted,
  toast: () => ({
    type: 'success',
    text: 'Welcome to projects page',
    delay: 2000,
  }),
})

export const Main = () => {
  useEffect(() => {
    pageMounted()
  }, [])
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
