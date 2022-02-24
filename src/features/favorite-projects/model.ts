import { createEvent, createStore } from 'effector'
import {
  loadFavoritesProjectsFx,
  saveFavoriteProjectFx,
} from '~/shared/api/internal'
import type { FavoritesProjects } from '~/shared/api/internal'

export const favoriteAdd = createEvent<{ favoriteID: string }>()

export const $favoriteProjects = createStore<FavoritesProjects[]>([])
  .on(loadFavoritesProjectsFx.doneData, (_, projectsID) => projectsID)
  .on(saveFavoriteProjectFx.doneData, (favorites, addedId) =>
    favorites.concat(addedId)
  )

export const $favoriteIdx = $favoriteProjects.map((projects) =>
  projects.map(({ projectID }) => projectID)
)
