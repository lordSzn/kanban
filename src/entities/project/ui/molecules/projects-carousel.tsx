import { useMediaQuery } from '@geist-ui/core'
import React, { FC } from 'react'
import { SliderProvider } from '~/shared/lib/slider'

interface Props {
  navigation?: boolean
}

export const ProjectsCarousel: FC<Props> = ({ children, navigation = true }) => {
  const upMd = useMediaQuery('md', { match: 'up' })
  const isShowNavigation = navigation && upMd

  return (
    <SliderProvider
      slides={{ perView: 4, spacing: 5 }}
      navigation={isShowNavigation}
      onNext={(slider) => slider.next()}
      onPrev={(slider) => slider.prev()}
      breakpoints={{
        '(max-width: 1580px)': {
          slides: { perView: 3, spacing: 15 },
        },
        '(max-width: 1230px)': {
          slides: { perView: 2 },
        },
        '(max-width: 830px)': {
          slides: { perView: 'auto', spacing: 5 },
        },
      }}
    >
      {children}
    </SliderProvider>
  )
}
