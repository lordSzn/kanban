import { attach, createEffect, createEvent, restore } from 'effector'

export const setUidForRequest = createEvent<string>()
export const $uidForRequest = restore(setUidForRequest, null)

export function createRequestFx<Params, Done>(
  handle: (params: Params, uid: string) => Promise<Done>
) {
  const bindFx = createEffect<{ params: Params; uid: string | null }, Done>(
    async ({ params, uid }) => {
      if (!uid) throw new Error('uid not provided')

      return handle(params, uid)
    }
  )

  return attach({
    effect: bindFx,
    source: $uidForRequest,
    mapParams: (params: Params, uid) => ({ params, uid }),
  })
}
