import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Environment, Network, FetchFunction } from 'relay-runtime'

import '../styles.css'
import { RelayEnvironmentProvider } from 'react-relay'

export const Route = createRootRoute({
  shellComponent: RootDocument,
})

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

const environment = new Environment({
  network: Network.create(fetchGraphQL),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </RelayEnvironmentProvider>
  )
}
