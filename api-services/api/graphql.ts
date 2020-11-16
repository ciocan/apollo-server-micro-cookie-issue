import { NowRequest, NowResponse } from '@vercel/node'
import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { send } from 'micro'

import { typeDefs } from '../src/graphql/schema'
import { resolvers, context } from '../src/graphql'
import { withCookies } from '../src/lib/cookie'

const SITE_URL: string = process.env.SITE_URL as string

const cors = Cors({
  origin: SITE_URL,
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Credentials', 'Mode'],
})

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

const optionsHandler = (req: NowRequest, res: NowResponse) => {
  if (req.method === 'OPTIONS') {
    // res.end()
    // res.status(200).send({ ok: true })
    send(res, 200, 'ok!')
    return
  }
  return apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

const handlerWithCookies = withCookies(optionsHandler)

export default cors((req, res) => handlerWithCookies(req, res))
