import { createEffect } from 'effector'
import {
  AuthProvider,
  getAuth,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth'
import { User } from '~/entities/user'

export const baseAuthenticateFx = createEffect<
  { provider: AuthProvider },
  User
>({
  handler: async ({ provider }) => {
    const auth = getAuth()
    const answer: UserCredential = await signInWithPopup(auth, provider)
    const user = answer.user

    return {
      fullname: user.displayName || 'unknown',
      email: user.email,
      photoUrl: user.photoURL || '',
    }
  },
})
