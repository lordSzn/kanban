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
  .on(removeFavoriteProjectFx.doneData, (favorites, { projectId }) =>
    favorites.filter((project) => project.projectID !== projectId)
  )

export const $favoriteIdx = $favoriteProjectsId.map((projects) =>
  projects.map(({ projectID }) => projectID)
)

export const $favoritesProjects = combine([$projects, $favoriteIdx], ([projects, favoritesId]) => {
  return projects.filter((project) => favoritesId.includes(project.projectID))
})

sample({
  source: favoriteAdd,
  target: saveFavoriteProjectFx,
})

sample({
  clock: favoriteRemove,
  source: $favoriteProjectsId,
  fn: (favorites, { favoriteID }) => {
    const docIdx = favorites.map(({ projectID }) => projectID)
    const idx = docIdx.indexOf(favoriteID)
    return {
      docId: favorites[idx].id,
      projectId: favorites[idx].projectID,
    }
  },
  target: removeFavoriteProjectFx,
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
