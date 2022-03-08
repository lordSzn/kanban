import { allSettled, createEvent, fork } from 'effector'
import { $currentUser } from '~/entities/session'
import { checkAuthenticated, sessionGetFx, $isAuthenticated } from './model'

describe('check authenticated', () => {
  it('to redirect on page started if not authorized', async () => {
    const scope = fork({
      handlers: new Map().set(sessionGetFx, () => null),
    })

    expect(scope.getState($isAuthenticated)).toBeFalsy()

    const pageStarted = createEvent()

    const redirectToHome = createEvent()
    const stopLogic = createEvent()

    const redirectToHomeMock = jest.fn()
    const stopLogicMock = jest.fn()

    redirectToHome.watch(redirectToHomeMock)
    stopLogic.watch(stopLogicMock)

    checkAuthenticated({
      when: pageStarted,
      if: 'authorized',
      then: redirectToHome,
      else: stopLogic,
    })

    await allSettled(pageStarted, {
      scope,
    })

    expect(scope.getState($isAuthenticated)).toBeFalsy()
    expect(redirectToHomeMock).toBeCalledTimes(0)
    expect(stopLogicMock).toBeCalledTimes(1)
  })

  it('at the start of the logic redirect if authorized', async () => {
    const scope = fork({
      values: new Map().set($currentUser, { user: 'stub' }),
    })

    expect(scope.getState($isAuthenticated)).toBeTruthy()

    const pageLoad = createEvent()

    const redirectToHome = createEvent()
    const pageLoaded = createEvent()

    const redirectToHomeMock = jest.fn()
    const pageLoadedMock = jest.fn()

    redirectToHome.watch(redirectToHomeMock)
    pageLoaded.watch(pageLoadedMock)

    checkAuthenticated({
      when: pageLoad,
      if: 'authorized',
      then: redirectToHome,
      else: pageLoaded,
    })

    await allSettled(pageLoad, {
      scope,
    })

    expect(redirectToHomeMock).toBeCalledTimes(1)
    expect(pageLoadedMock).toBeCalledTimes(0)
  })
})
