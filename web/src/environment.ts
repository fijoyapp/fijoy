import { Environment, Network } from 'relay-runtime'
import type { FetchFunction } from 'relay-runtime'

// TODO: DO NOT HARD CODE
const HTTP_ENDPOINT = 'http://localhost:3000/query'

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: request.text, variables }),
  })
  if (!resp.ok) {
    throw new Error('Response failed.')
  }
  return await resp.json()
}

export const environment = new Environment({
  network: Network.create(fetchGraphQL),
})
