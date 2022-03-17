import { combine, createEvent, createStore, sample } from 'effector'
import { $projects } from '~/entities/project'
import {
  loadFavoritesProjectsFx,
  removeFavoriteProjectFx,
  saveFavoriteProjectFx,
} from '~/shared/api/requests'
import type { FavoritesProjects } from '~/shared/api/requests'
import { showMessage } from '~/shared/lib/toast'

export const favoriteAdd = createEvent<{ favoriteID: string }>()
export const favoriteRemove = createEvent<{ favoriteID: string }>()

export const $favoriteProjectsId = createStore<FavoritesProjects[]>([])
  .on(loadFavoritesProjectsFx.doneData, (_, projectsID) => projectsID)
  .on(saveFavoriteProjectFx.doneData, (favorites, addedId) => favorites.concat(addedId))

export const $favoriteIdx = $favoriteProjectsId.map((projects) =>
  projects.map(({ projectID }) => projectID)
)

export const $favoritesProjects = combine([$projects, $favoriteIdx], ([projects, favoriteId]) => {
  return projects.filter((project) => favoriteId.includes(project.projectID))
})

sample({
  source: favoriteAdd,
  target: saveFavoriteProjectFx,
})

showMessage({
  when: saveFavoriteProjectFx.doneData,
  toast: () => ({
    type: 'success',
    text: 'project add to favorite',
  }),
})

sample({
  source: favoriteRemove,
  target: removeFavoriteProjectFx,
})
