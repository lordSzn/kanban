import { FC } from 'react'

export type GetProps<T extends FC<never>> = Parameters<T>[0]
