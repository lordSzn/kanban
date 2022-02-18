import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector'
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'

export const initFirebase = <T extends FirebaseOptions>({
  config,
}: {
  config: T
}) => {
  const $credentials = createStore(config)
  const run = createEvent()

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
    source: run,
    target: startFirebaseApp,
  })

  run()
}
