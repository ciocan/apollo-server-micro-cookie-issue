import { NowRequest, NowResponse } from '@vercel/node'

interface Handler {
  (req: NowRequest, res: NowResponse): void
}

interface Handlers {
  [method: string]: Handler
}

const SITE_URL: string = process.env.SITE_URL as string

export function createHandlers(handlers: Handlers) {
  return async (req: NowRequest, res: NowResponse) => {
    const method: string = req.method as string

    const handler = handlers[method]

    if (handler) {
      try {
        const handlerWithCors = allowCors(handler)
        await handlerWithCors(req, res)
      } catch (err) {
        res.status(err.status || 500).end(err.message)
      }
    } else {
      res.setHeader('Allow', Object.keys(handlers))
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}

export const allowCors = (fn: Handler) => async (req: NowRequest, res: NowResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', SITE_URL)
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Accept, Accept-Version, Content-Type',
  )
  return fn(req, res)
}
