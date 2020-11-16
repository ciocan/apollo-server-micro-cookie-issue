import React, { useCallback, useState } from 'react'
import { Text, Input, Button, HStack, VStack } from '@chakra-ui/core'
import { GraphQLClient, gql } from 'graphql-request'

import { API_URL } from '../lib/config'

const fetcher = (url: string, options?: any) =>
  fetch(url, {
    mode: 'cors',
    credentials: 'include',
    ...options,
  })
    .then((r) => r.json())
    .then((data) => data)

const SET_COOKIE = gql`
  mutation setCookie($token: String) {
    setCookie(token: $token)
  }
`
const GET_COOKIE = gql`
  query getCookie {
    getCookie {
      token
    }
  }
`

const client = new GraphQLClient(`${API_URL}/api/graphql`, {
  headers: {
    mode: 'cors',
    credentials: 'include',
  },
})

export default function Home(): JSX.Element {
  const [fetchValue, setFetchValue] = useState({
    setCookie: 'fetch_cookie_value',
    getCookie: '',
  })
  const [gqlValue, setGqlValue] = useState({
    setCookie: 'gql_cookie_value',
    getCookie: '',
  })

  const fetchSetCookie = useCallback(() => {
    fetcher(`${API_URL}/api/cookie`, { method: 'POST', body: fetchValue.setCookie })
  }, [fetchValue])

  const fetchGetCookie = useCallback(async () => {
    const { token } = await fetcher(`${API_URL}/api/cookie`)
    setFetchValue({ ...fetchValue, getCookie: token })
  }, [fetchValue])

  const gqlSetCookie = useCallback(() => {
    client.request(SET_COOKIE, { token: gqlValue.setCookie })
  }, [gqlValue])

  const gqlGetCookie = useCallback(async () => {
    const data = await client.request(GET_COOKIE)
    setGqlValue({ ...gqlValue, getCookie: data.getCookie.token })
  }, [gqlValue])

  return (
    <VStack justifyContent="center" m="4">
      <Text>with fetch request</Text>
      <HStack>
        <Input
          w="s"
          value={fetchValue.setCookie}
          onChange={(e) => setFetchValue({ ...fetchValue, setCookie: e.target.value })}
        />
        <Button color="red.500" onClick={fetchSetCookie}>
          setCookie
        </Button>
      </HStack>
      <HStack mb="8">
        <Button color="green.500" onClick={fetchGetCookie}>
          getCookie
        </Button>
        <Input value={fetchValue.getCookie} w="s" readOnly />
      </HStack>

      <Text>with GraphQL request</Text>
      <HStack>
        <Input
          w="s"
          value={gqlValue.setCookie}
          onChange={(e) => setGqlValue({ ...gqlValue, setCookie: e.target.value })}
        />
        <Button color="red.500" onClick={gqlSetCookie}>
          setCookie
        </Button>
      </HStack>
      <HStack>
        <Button color="green.500" onClick={gqlGetCookie}>
          getCookie
        </Button>
        <Input value={gqlValue.getCookie} w="s" readOnly />
      </HStack>
    </VStack>
  )
}
