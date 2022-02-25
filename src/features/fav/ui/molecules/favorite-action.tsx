import { Button } from '@geist-ui/core'
import React, { FC, memo } from 'react'
import { useIsFavorite } from '../../library'

interface Props {
  projectID: string
}

export const FavoriteAction: FC<Props> = memo(({ projectID }) => {
  const isFavorite = useIsFavorite(projectID)

  if (isFavorite) {
    return <Button>Mark as important</Button>
  }

  return <Button>Remove from important</Button>
})
