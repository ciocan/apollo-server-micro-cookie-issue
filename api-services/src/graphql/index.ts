import { getCookie, setCookie } from './resolvers'

export const resolvers = {
  Query: {
    getCookie: async (parent: any, args: any, ctx: any) => await getCookie(ctx),
  },
  Mutation: {
    setCookie: async (parent: any, args: any, ctx: any) => await setCookie(args, ctx),
  },
}

export const context = async (ctx: any) => {
  // console.log('ctx:', ctx.req.headers, ctx.req.cookies)
  // console.log('ctx:', ctx)
  return {
    cookie: ctx.res.cookie,
    ...ctx,
  }
}
