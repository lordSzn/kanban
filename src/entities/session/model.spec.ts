import { allSettled, createEvent, fork } from 'effector'
import { checkAuthenticated, $isAuthenticated, $currentUser } from './model'

describe('check authenticated', () => {
  it('stop logic if not authorized', async () => {
    const scope = fork({
      values: new Map().set($currentUser, null),
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
      values: new Map().set($currentUser, { email: 'test@email.com', fullname: 'kek' }),
    })

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

  it('redirect to the logic page if not anonymous', async () => {
    const scope = fork({
      values: new Map().set($currentUser, { email: 'test@email.com', fullname: 'kek' }),
    })

    const pageLoad = createEvent()

    const loginRouteOpen = createEvent()
    const stopLogic = createEvent()

    const redirectMock = jest.fn()
    const stopLogicMock = jest.fn()

    loginRouteOpen.watch(redirectMock)
    stopLogic.watch(stopLogicMock)

    checkAuthenticated({
      when: pageLoad,
      if: 'anonymous',
      then: loginRouteOpen,
      else: stopLogic,
    })

    await allSettled(pageLoad, {
      scope,
    })

    expect(scope.getState($isAuthenticated)).toBeTruthy()
    expect(redirectMock).toBeCalledTimes(0)
    expect(stopLogicMock).toBeCalledTimes(1)
  })

  it('redirect to login when anonymous', async () => {
    const scope = fork({
      values: new Map().set($currentUser, null),
    })

    expect(scope.getState($isAuthenticated)).toBeFalsy()

    const pageLoad = createEvent()

    const toLogin = createEvent()
    const toLoginMock = jest.fn()

    toLogin.watch(toLoginMock)

    checkAuthenticated({
      when: pageLoad,
      if: 'anonymous',
      then: toLogin,
    })

    await allSettled(pageLoad, {
      scope,
    })

    expect(scope.getState($isAuthenticated)).toBeFalsy()
    expect(toLoginMock).toBeCalledTimes(1)
  })
})
