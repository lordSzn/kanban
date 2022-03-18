import { HeartFill, Heart } from '@geist-ui/icons'
import { styled } from '@linaria/react'
import { useStoreMap } from 'effector-react'
import React, { FC } from 'react'
import { $favoriteIdx, favoriteAdd, favoriteRemove } from '../../model'

interface Props {
  projectID: string
  className?: string
  size?: number
}

export const SaveProject: FC<Props> = ({ projectID, className, size }) => {
  const isFavorite = useStoreMap({
    store: $favoriteIdx,
    keys: [projectID],
    fn: (favorites, [projectID]) => favorites.includes(projectID),
  })

  const label = isFavorite ? <HeartFill size={size} color="red" /> : <Heart size={size} />

  if (isFavorite) {
    return (
      <Button
        className={className}
        data-favorite={isFavorite}
        onClick={() => favoriteRemove({ favoriteID: projectID })}
      >
        {label}
      </Button>
    )
  }

  return (
    <Button
      className={className}
      data-favorite={isFavorite}
      onClick={() => favoriteAdd({ favoriteID: projectID })}
    >
      {label}
    </Button>
  )
}

const Button = styled.button``
