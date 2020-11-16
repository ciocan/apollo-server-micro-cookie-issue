import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Token {
    token: String
  }

  type Query {
    getCookie: Token!
  }

  type Mutation {
    setCookie(token: String): Boolean
  }
`
