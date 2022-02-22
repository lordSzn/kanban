import { createEffect } from 'effector'
import { getFirestore } from 'firebase/firestore'

export const getFirestoreFx = createEffect(getFirestore)
