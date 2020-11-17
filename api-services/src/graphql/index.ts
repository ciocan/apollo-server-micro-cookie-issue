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
  return {
    cookie: ctx.res.cookie,
    cookies: ctx.req.cookies,
  }
}
