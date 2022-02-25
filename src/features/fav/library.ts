import { useStoreMap } from 'effector-react'
import { $favoritesProjects } from '.'

export const useIsFavorite = (projectID: string) => {
  const isFavorite = useStoreMap({
    store: $favoritesProjects,
    keys: [projectID],
    fn: (projects, [id]) =>
      projects.some((project) => project.projectID === id),
  })

  return isFavorite
}
