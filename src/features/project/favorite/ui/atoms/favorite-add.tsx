import { Button } from '@geist-ui/core'
import { Star } from '@geist-ui/icons'
import { useStoreMap } from 'effector-react'
import React, { FC } from 'react'
import { $favoritesIds, favoriteAdd, favoriteRemove } from '../../model'

export const FavoriteAdd: FC<{ projectID: string }> = ({ projectID }) => {
  const isFavorite = useStoreMap({
    store: $favoritesIds,
    keys: [projectID],
    fn: (favorites, [projectID]) => favorites.includes(projectID),
  })

  if (isFavorite) {
    return (
      <Button
        auto
        type="abort"
        onClick={() => favoriteRemove({ projectId: projectID })}
        iconRight={<Star fill="black" />}
        scale={2 / 3}
      />
    )
  }

  return (
    <Button
      auto
      type="abort"
      onClick={() => favoriteAdd({ projectId: projectID })}
      iconRight={<Star />}
      scale={2 / 3}
    />
  )
}
