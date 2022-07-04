import { Button } from '@geist-ui/core'
import { Star } from '@geist-ui/icons'
import { useStore, useStoreMap } from 'effector-react'
import React, { FC } from 'react'
import { $isDark } from '~/features/theme'
import { $favoritesIds, favoriteAdd, favoriteRemove } from '../../model'

export const FavoriteAdd: FC<{ projectID: string }> = ({ projectID }) => {
  const isDark = useStore($isDark)
  const isFavorite = useStoreMap({
    store: $favoritesIds,
    keys: [projectID],
    fn: (favorites, [projectID]) => favorites.includes(projectID),
  })

  const fill = isDark ? 'white' : 'black'

  if (isFavorite) {
    return (
      <Button
        auto
        type="abort"
        onClick={() => favoriteRemove({ projectId: projectID })}
        iconRight={<Star fill={fill} />}
        scale={2 / 3}
      />
    )
  }

  return (
    <Button
      auto
      type="abort"
      onClick={() => favoriteAdd({ projectId: projectID })}
      iconRight={<Star fill={fill} />}
      scale={2 / 3}
    />
  )
}
