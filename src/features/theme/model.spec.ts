import { allSettled, fork } from 'effector'
import { $theme, themeToggled } from '.'

describe('theme', () => {
  it('toggle theme', async () => {
    const scope = fork({
      values: new Map().set($theme, 'dark'),
    })

    await allSettled(themeToggled, {
      scope,
    })

    expect(scope.getState($theme)).toBe('light')
  })
})
