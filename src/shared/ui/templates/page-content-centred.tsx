import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'

interface Props {
  header: ReactNode
  footer?: ReactNode
}

export const PageContentCentred: FC<Props> = ({ header, children, footer }) => {
  return (
    <Section>
      <Header>{header}</Header>
      <Main>{children}</Main>
      {footer && <Footer>{footer}</Footer>}
    </Section>
  )
}

const Section = styled.section`
  max-width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  height: auto;
  margin: 0 auto 0 auto;
`

const Header = styled.header`
  width: 100%;
`

const Main = styled.main`
  padding: 0 24px 0 24px;
  width: 100%;
  margin: 0 auto 0 auto;
`

const Footer = styled.footer`
  padding: 0 calc(1.34 * 16px) 0 calc(1.34 * 16px);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
`
