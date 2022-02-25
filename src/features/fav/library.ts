import { useStore } from 'effector-react'
import { $favoriteIdx } from '.'

export const useIsFavorite = (projectID: string) => {
  return useStore($favoriteIdx).includes(projectID)
}
