import { attach, combine, createEvent, createStore, sample } from 'effector'
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

export const saveFavoriteFx = attach({ effect: saveFavoriteProjectFx })
export const removeFavoriteFx = attach({ effect: removeFavoriteProjectFx })

sample({
  source: favoriteAdd,
  target: saveFavoriteFx,
})

export const $favorites = createStore<FavoritesProjects[]>([])
  .on(loadFavoritesProjectsFx.doneData, (_, favorites) => favorites)
  .on(saveFavoriteFx.doneData, (favorites, addedId) => favorites.concat(addedId))
  .on(removeFavoriteFx.doneData, (favorites, { projectId }) =>
    favorites.filter((project) => project.projectID !== projectId)
  )

sample({
  clock: favoriteRemove,
  source: $favorites,
  fn: (favorites, { favoriteID }) => {
    const docIdx = favorites.map(({ projectID }) => projectID)
    const idx = docIdx.indexOf(favoriteID)
    return {
      docId: favorites[idx].favoriteId,
      projectId: favorites[idx].projectID,
    }
  },
  target: removeFavoriteFx,
})

export const $favoriteIdx = $favorites.map((projects) => projects.map(({ projectID }) => projectID))

export const $favoritesProjects = combine([$projects, $favoriteIdx], ([projects, favoritesId]) => {
  return projects.filter((project) => favoritesId.includes(project.projectID))
})

showMessage({
  when: saveFavoriteProjectFx.doneData,
  toast: () => ({
    type: 'success',
    text: 'project add to favorite',
  }),
})

showMessage({
  when: removeFavoriteProjectFx.doneData,
  toast: () => ({
    type: 'success',
    text: 'project remove from favorite',
  }),
})
