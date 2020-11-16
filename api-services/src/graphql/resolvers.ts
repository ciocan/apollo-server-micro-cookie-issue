const MAX_AGE = 60 * 60 * 8 // 8 hours

export async function getCookie(ctx: any) {
  console.log('gql/getCookie', ctx.req.headers.cookies, ctx.req.cookies)

  return { token: '???' }
}

export function setCookie(args: any, ctx: any) {
  console.log('gql/setCookie', args.token)

  ctx.cookie('token', args.token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    path: '/',
    sameSite: 'strict',
    httpOnly: true,
    // secure: true,
    // domain: process.env.API_COOKIE_DOMAIN,
  })

  return true
}
