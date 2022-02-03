import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children?: ReactNode
}

export const ContentCentred = ({ children }: Props) => {
  return (
    <>
      <Container>
        <GroupTable>{children}</GroupTable>
      </Container>
    </>
  )
}

const Container = styled.section`
  max-width: 120rem;
  margin: 0 auto;
`

const GroupTable = styled.div`
  display: flex;
  justify-content: space-between;
`
