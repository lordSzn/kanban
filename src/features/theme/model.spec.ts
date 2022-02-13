import { fork, Scope, allSettled } from 'effector'
import { getSaveThemeFx } from '.'
import { $theme, getSystemThemeFx } from './model'

describe('theme', () => {
  describe('event', () => {
    it('load dark save theme', async () => {
      const scope: Scope = fork({
        handlers: new Map().set(getSaveThemeFx, () => 'light'),
      })

      await allSettled(getSaveThemeFx, {
        scope,
      })

      const expected = 'dark'

      expect(scope.getState($theme)).toBe(expected)
    })

    it('load system theme when save theme is not found', async () => {
      const scope: Scope = fork({
        handlers: new Map()
          .set(getSaveThemeFx, () => null)
          .set(getSystemThemeFx, () => 'light'),
      })

      await allSettled(getSaveThemeFx, {
        scope,
      })

      const expected = 'light'

      expect(scope.getState($theme)).toBe(expected)
    })
  })
})
