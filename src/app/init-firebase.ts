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

const $credentials = createStore<FirebaseOptions>({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  measurementId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
})

export const startFirebase = attach({
  source: $credentials,
  effect: initFirebaseFx,
})
