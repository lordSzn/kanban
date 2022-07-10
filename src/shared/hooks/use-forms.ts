import { composeFields } from 'composable-forms'
import { useStore } from 'effector-react'

type Props= Parameters<typeof composeFields<any>>[0]

export const useForms = (config: Props) => {
  const fileds = useStore(config.fields)

  return {
    isTouched: false,
  }
}
