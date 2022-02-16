import { attach, createEffect, createStore } from 'effector'
import { FirebaseOptions, initializeApp } from 'firebase/app'

const initFirebaseFx = createEffect({
  handler: async (config: FirebaseOptions) => {
    initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.measurementId,
      appId: config.appId,
    })
  },
})

const $credentials = createStore({})

export const startedFirebase = attach({
  source: $credentials,
  effect: initFirebaseFx,
})
