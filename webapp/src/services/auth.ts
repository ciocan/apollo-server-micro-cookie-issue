import { GraphQLClient } from 'graphql-request'
import { Magic } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'

import { API_URL } from 'lib/config'

const NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY: string = process.env
  .NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string

const LOGIN = `
  mutation login($userInfo: String) {
    login(userInfo: $userInfo) {
      ok
      error
    }
  }
`

export async function Login(email: string) {
  const magic = new Magic(NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)

  const didToken = (await magic.auth.loginWithMagicLink({ email })) as string

  const client = new GraphQLClient(`${API_URL}/graphql`, {
    headers: {
      authorization: didToken,
      credentials: 'include',
      mode: 'cors',
    },
  })

  return client.request(LOGIN)
}

export async function LoginWithGoogle() {
  const magic = new Magic(NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
    extensions: [new OAuthExtension()],
  })

  const result = await magic.oauth.getRedirectResult()

  const client = new GraphQLClient(`${API_URL}/graphql`, {
    headers: {
      authorization: result.magic.idToken,
      credentials: 'include',
      mode: 'cors',
    },
  })

  return client.request(LOGIN, { userInfo: JSON.stringify(result.oauth.userInfo) })
}
