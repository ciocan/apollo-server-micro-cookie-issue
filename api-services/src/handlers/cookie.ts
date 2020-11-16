import { NowRequest, NowResponse } from '@vercel/node'
import { parse } from 'cookie'

import { createCookie } from '../lib/cookie'

const handlers = {
  POST: async (req: NowRequest, res: NowResponse) => {
    console.log('POST', req.body)
    await createCookie(res, req.body)

    return res.status(200).send({ ok: true })
  },
  GET: async (req: NowRequest, res: NowResponse) => {
    console.log('GET', req.headers.cookie)
    const cookie = parse(req.headers.cookie || 'token=')
    return res.status(200).json(cookie)
  },
  OPTIONS: async (req: NowRequest, res: NowResponse) => res.status(200).send({ ok: true }),
}
export default handlers
