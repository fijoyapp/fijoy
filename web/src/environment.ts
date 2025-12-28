import { Environment, Network } from 'relay-runtime'
import type { FetchFunction } from 'relay-runtime'
import { env } from './env'

const HTTP_ENDPOINT = env.VITE_SERVER_URL

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const token = localStorage.getItem('token')
  const householdId = localStorage.getItem('householdId')

  const resp = await fetch(HTTP_ENDPOINT + '/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(householdId ? { 'X-Household-ID': householdId } : {}),
    },
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
