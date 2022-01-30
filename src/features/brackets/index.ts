import {
  Clock,
  createEffect,
  createEvent,
  createStore,
  sample,
  Store,
} from 'effector'

interface Result {
  $validBrackets: Store<boolean>
}

const validateBrackets = (string: string) => {
  const stack: string[] = []

  const bracketsOpened = ['(', '[', '{']
  const bracketsClosed = [')', '[', '{']

  const allBracketsRule = [...bracketsOpened, ...bracketsClosed]

  for (const char of string) {
    if (!(char in allBracketsRule)) continue

    const lastLetter = stack[stack.length - 1]

    if (char in bracketsOpened) {
      stack.push(char)
    } else {
      if (stack.length === 0) return false

      const idx = bracketsOpened.indexOf(lastLetter)

      if (char === bracketsClosed[idx]) {
        stack.pop()
      }
    }
  }

  return true
}

export const createControlBrackets = (config: {
  source: Store<string>
  clock: Clock<unknown>
  delay?: number
}): Result => {
  const $delay = createStore(config.delay ?? 1000)
  const update = createEvent()

  const debounce = createEffect<number, void>((delay) => {
    return new Promise((res) => setTimeout(res, delay))
  })

  sample({
    clock: update,
    source: $delay,
    target: debounce,
  })

  const $validBrackets = createStore(false)

  sample({
    clock: debounce.done,
    source: config.source,
    fn: validateBrackets,
    target: $validBrackets,
  })

  return {
    $validBrackets,
  }
}
