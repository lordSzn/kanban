import { allSettled, fork } from 'effector'
import { removeFavoriteProjectFx, saveFavoriteProjectFx } from '~/shared/api/requests'
import { $favorites, favoriteAdd, favoriteRemove } from './model'

describe('favorites', () => {
  it('should be added project to favorites', async () => {
    const expected = [{ projectId: 'projectId', documentId: 'favoriteID' }]

    const scope = fork({
      handlers: new Map().set(
        saveFavoriteProjectFx,
        ({ body }: { body: { projectId: string } }) => {
          return {
            projectId: body.projectId,
            documentId: 'favoriteID',
          }
        }
      ),
    })

    expect(scope.getState($favorites)).toHaveLength(0)

    await allSettled(favoriteAdd, {
      params: { projectId: 'projectId' },
      scope,
    })

    expect(scope.getState($favorites)).toHaveLength(1)
    expect(scope.getState($favorites)).toEqual(expected)
  })

  it('remove project from favorites', async () => {
    const projects = [
      { projectId: '1', favoriteID: 'favoriteID1' },
      { projectId: '2', favoriteID: 'favoriteID2' },
    ]

    const removedProjectId = '2'

    const scope = fork({
      values: new Map().set($favorites, projects),
      handlers: new Map().set(removeFavoriteProjectFx, () => ({
        projectId: removedProjectId,
      })),
    })

    await allSettled(favoriteRemove, {
      params: { projectId: removedProjectId },
      scope,
    })

    const expected = [{ projectId: '1', favoriteID: 'favoriteID1' }]

    expect(scope.getState($favorites)).toEqual(expected)
  })
})
