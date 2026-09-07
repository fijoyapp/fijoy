import { createHash, webcrypto } from 'node:crypto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ky from 'ky'
import type { RequestParameters } from 'relay-runtime'
import { fetchGraphQL } from './environment'

vi.mock('./env', () => ({
  env: { VITE_SERVER_URL: 'https://api.example.test' },
}))
vi.mock('ky', () => ({ default: { post: vi.fn() } }))

const request: RequestParameters = {
  name: 'TestQuery',
  operationKind: 'query',
  text: 'query TestQuery { __typename }',
  id: null,
  cacheID: 'relay-cache-id-is-not-a-sha256-hash',
  metadata: {},
}
const miss = {
  data: null,
  errors: [
    {
      message: 'PersistedQueryNotFound',
      extensions: { code: 'PERSISTED_QUERY_NOT_FOUND' },
    },
  ],
}
const success = { data: { __typename: 'Query' } }
const post = vi.mocked(ky.post)
const respond = (body: object) =>
  post.mockReturnValueOnce({ json: async () => body } as ReturnType<
    typeof ky.post
  >)
const run = (operation = request) => fetchGraphQL(operation, { id: 42 }, {})

beforeEach(() => {
  post.mockReset()
  vi.stubGlobal('crypto', webcrypto)
  const values: Record<string, string> = {
    token: 'test-token',
    householdId: '7',
    displayCurrencyId: '9',
  }
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => values[key] ?? null,
  })
})

afterEach(() => vi.unstubAllGlobals())

describe('Relay automatic persisted queries', () => {
  it('sends the SHA-256 hash without query text on a cache hit', async () => {
    respond(success)
    expect(await run()).toEqual(success)
    expect(post).toHaveBeenCalledExactlyOnceWith(
      'https://api.example.test/query',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
          'X-Household-ID': '7',
          'X-Display-Currency-ID': '9',
        },
        json: {
          operationName: request.name,
          variables: { id: 42 },
          extensions: {
            persistedQuery: {
              version: 1,
              sha256Hash: createHash('sha256')
                .update(request.text!)
                .digest('hex'),
            },
          },
        },
      },
    )
  })

  it('registers the full query once on a miss and returns to hash-only requests', async () => {
    respond(miss)
    respond(success)
    respond(success)
    expect(await run()).toEqual(success)
    const first = post.mock.calls[0][1]!
    expect(post.mock.calls[1][1]).toEqual({
      ...first,
      json: { ...first.json!, query: request.text },
    })
    expect(await run()).toEqual(success)
    expect(post.mock.calls[2][1]).toEqual(first)
    expect(post).toHaveBeenCalledTimes(3)
  })

  it('does not loop if registration also returns a cache miss', async () => {
    respond(miss)
    respond(miss)
    expect(await run()).toEqual(miss)
    expect(post).toHaveBeenCalledTimes(2)
  })

  it('supports the same handshake for mutations', async () => {
    respond(miss)
    respond(success)
    const mutation: RequestParameters = {
      ...request,
      name: 'TestMutation',
      operationKind: 'mutation',
      text: 'mutation TestMutation { doSomething }',
    }
    await run(mutation)
    expect(post.mock.calls[1][1]?.json).toMatchObject({
      operationName: mutation.name,
      query: mutation.text,
    })
    expect(post).toHaveBeenCalledTimes(2)
  })

  it.each([
    { errors: [{ message: 'Forbidden', extensions: { code: 'FORBIDDEN' } }] },
    { data: { result: null }, errors: miss.errors },
  ])(
    'does not retry execution errors or responses with data: %j',
    async (body) => {
      respond(body)
      expect(await run()).toEqual(body)
      expect(post).toHaveBeenCalledTimes(1)
    },
  )

  it('propagates HTTP errors without retrying the operation', async () => {
    post.mockReturnValueOnce({
      json: async (): Promise<object> => {
        throw new Error('Unauthorized')
      },
    } as ReturnType<typeof ky.post>)
    await expect(run()).rejects.toThrow('Unauthorized')
    expect(post).toHaveBeenCalledTimes(1)
  })

  it('sends ordinary queries when Web Crypto is unavailable', async () => {
    vi.stubGlobal('crypto', undefined)
    respond(success)
    await run()
    expect(post.mock.calls[0][1]?.json).toEqual({
      query: request.text,
      operationName: request.name,
      variables: { id: 42 },
    })
  })
})
