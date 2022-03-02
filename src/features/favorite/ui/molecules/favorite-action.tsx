import { Button } from '@geist-ui/core'
import React, { FC, memo } from 'react'
import { useIsFavorite } from '../../library'

interface Props {
  projectID: string
}

export const FavoriteAction: FC<Props> = memo(({ projectID }) => {
  const isFavorite = useIsFavorite(projectID)
  const title = isFavorite ? 'Remove from important' : 'Add to important'

  return <Button>{title}</Button>
})
