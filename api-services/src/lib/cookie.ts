import { NowResponse } from '@vercel/node'
import { serialize } from 'cookie'

const MAX_AGE = 60 * 60 * 8 // 8 hours

export async function createCookie(res: NowResponse, data: string) {
  const cookie = serialize('token', data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    path: '/',
    sameSite: 'strict',
    httpOnly: true,
    // secure: true,
    // domain: process.env.API_COOKIE_DOMAIN,
  })

  res.setHeader('Set-Cookie', cookie)
}

const cookie = (res: NowResponse, name: string, value: string, options = {}) => {
  res.setHeader('Set-Cookie', [serialize(name, value, options)])
}

export const withCookies = (handler: any) => (req: any, res: any) => {
  // @ts-ignore
  res.cookie = (name, value, options) => cookie(res, name, value, options)
  return handler(req, res)
}
