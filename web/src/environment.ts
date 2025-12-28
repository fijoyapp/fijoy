import { Environment, Network } from 'relay-runtime'
import { env } from './env'
import {
  LOCAL_STORAGE_HOUSEHOLD_ID_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
} from './constant'
import type { FetchFunction } from 'relay-runtime'

const HTTP_ENDPOINT = env.VITE_SERVER_URL

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
  const householdId = localStorage.getItem(LOCAL_STORAGE_HOUSEHOLD_ID_KEY)

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
