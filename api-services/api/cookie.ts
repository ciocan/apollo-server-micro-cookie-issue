import { NowRequest, NowResponse } from '@vercel/node'

import { createHandlers } from '../src/lib/rest-utils'
import handlers from '../src/handlers/cookie'

export default function login(req: NowRequest, res: NowResponse) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}
