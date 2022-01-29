import {
  Clock,
  createEffect,
  createEvent,
  createStore,
  sample,
  Store,
} from 'effector'

type Result = {
  valid: boolean
  error?: string
}

export const createControlBrackets = (config: {
  source: Store<string>
  clock: Clock<unknown>
  delay?: number
}) => {
  const $delay = createStore(config.delay ?? 1000)
  const $stack = createStore<string[]>([])
  const update = createEvent()
  const $indexStack = createStore<number[]>([])

  const debounce = createEffect<number, void>((delay) => {
    return new Promise((res) => setTimeout(res, delay))
  })

  sample({
    clock: update,
    source: $delay,
    target: debounce,
  })

  const updated = sample({
    clock: debounce.done,
    source: [config.source, $stack, $indexStack],
  })

  const validateBrackets = (
    str: string,
    stack: string[],
    idxStack: string[]
  ) => {
    const brackets_rule = {
      '(': ')',
      '[': ']',
      '{': '}',
    }

    for (const char of str) {
      const last_brackets = stack[stack.length - 1]

      if (char in brackets_rule) {
        stack.push(char)
      }
    }
  }
}
