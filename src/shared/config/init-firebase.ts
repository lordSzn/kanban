import { attach, createEffect, createStore, sample, Unit } from 'effector'
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'
// @fix
import { appStarted } from './run-logic'

export const initFirebase = <T extends FirebaseOptions, R>({
  config,
  when,
}: {
  config: T
  when: Unit<R>
}) => {
  const $opened = createStore(false)
  const $credentials = createStore(config)
  const $firebaseApp = createStore<FirebaseApp | null>(null)

  const initFirebaseFx = createEffect<FirebaseOptions, FirebaseApp, void>({
    handler: async (credentials) => {
      const app = initializeApp({
        apiKey: credentials.apiKey,
        authDomain: credentials.authDomain,
        projectId: credentials.projectId,
        storageBucket: credentials.storageBucket,
        messagingSenderId: credentials.measurementId,
        appId: credentials.appId,
      })

      return app
    },
  })

  const startFirebaseApp = attach({
    source: $credentials,
    effect: initFirebaseFx,
  })

  sample({
    source: when,
    target: startFirebaseApp,
  })

  sample({
    source: startFirebaseApp.doneData,
    target: $firebaseApp,
  })

  return {
    $firebaseApp,
    $opened,
  }
}

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  measurementId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
}

export const $firebaseInstance = initFirebase({
  // tempore solution
  when: appStarted,
  config,
})
