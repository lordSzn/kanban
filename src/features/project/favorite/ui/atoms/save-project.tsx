import { Like } from '@icon-park/react'
import { styled } from '@linaria/react'
import { useStoreMap } from 'effector-react'
import React, { FC, ReactNode } from 'react'
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

  const icon = isFavorite ? <Like size={size} theme="filled" /> : <Like size={size} />

  if (isFavorite) {
    return (
      <HeartButton
        icon={icon}
        className={className}
        isFavorite={isFavorite}
        onClick={() => favoriteRemove({ favoriteID: projectID })}
      />
    )
  }

  return (
    <HeartButton
      icon={icon}
      className={className}
      isFavorite={isFavorite}
      onClick={() => favoriteAdd({ favoriteID: projectID })}
    />
  )
}

interface HeartProps {
  onClick(): void
  className?: string
  isFavorite: boolean
  icon?: ReactNode
}

const HeartButtonBase: FC<HeartProps> = ({ isFavorite, onClick, icon, className }) => {
  return (
    <button className={className} data-favorite={isFavorite} onClick={onClick}>
      <label data-element="label">{icon}</label>
    </button>
  )
}

export const HeartButton = styled(HeartButtonBase)<HeartProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  text-align: center;

  cursor: pointer;
  overflow: visible;
  width: 60px;

  outline: none;
  border: none;
`
