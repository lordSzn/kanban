import { useKeenSlider } from 'keen-slider/react'
import { FC, memo, useLayoutEffect } from 'react'
import { addRef } from '.'

type SliderParams = Parameters<typeof useKeenSlider>

interface Props {
  options: SliderParams[0]
  plugins: SliderParams[1]
}

export const SliderProvider: FC<Props> = memo(({ options, plugins }) => {
  const [sliderRef, sliderInstance] = useKeenSlider(options, plugins)

  useLayoutEffect(() => {
    addRef(sliderInstance)
  }, [])

  return null
})
