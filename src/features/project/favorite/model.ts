import { attach, combine, createEvent, restore, sample } from 'effector'
import { $projects } from '~/entities/project'
import {
  loadFavoritesProjectsFx,
  removeFavoriteProjectFx,
  saveFavoriteProjectFx,
} from '~/shared/api/requests'
import { showMessage } from '~/shared/lib/toast'

export const favoriteAdd = createEvent<{ projectId: string }>()
export const favoriteRemove = createEvent<{ projectId: string }>()

export const saveFavoriteFx = attach({ effect: saveFavoriteProjectFx })
export const unSaveFavoriteFx = attach({ effect: removeFavoriteProjectFx })

export const $favorites = restore(loadFavoritesProjectsFx, [])
  .on(loadFavoritesProjectsFx.doneData, (_, favorites) => favorites)
  .on(unSaveFavoriteFx.doneData, (favorites, { projectId }) =>
    favorites.filter((project) => project.projectId !== projectId)
  )
  .on(saveFavoriteFx.doneData, (favorites, newFavoriteProject) => [
    ...favorites,
    newFavoriteProject,
  ])

export const $favoritesIds = $favorites.map((projects) =>
  projects.map(({ projectId }) => projectId)
)

export const $favoritesProjects = combine([$projects, $favoritesIds], ([projects, favoritesIds]) =>
  projects.filter((project) => favoritesIds.includes(project.projectID))
)

sample({
  clock: favoriteAdd,
  fn: ({ projectId }) => ({ body: { projectId } }),
  target: saveFavoriteFx,
})

sample({
  clock: favoriteRemove,
  source: $favorites,
  fn(favorites, { projectId }) {
    const neededProject = favorites.find((project) => project.projectId === projectId)!

    return {
      body: {
        documentId: neededProject.documentId,
        projectId: neededProject.projectId,
      },
    }
  },
  target: unSaveFavoriteFx,
})

showMessage({
  when: saveFavoriteProjectFx.doneData,
  toast: () => ({ type: 'success', text: 'project add to favorite' }),
})

showMessage({
  when: removeFavoriteProjectFx.doneData,
  toast: () => ({ type: 'success', text: 'project remove from favorite' }),
})
