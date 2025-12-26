import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import '../styles.css'
import { RelayEnvironmentProvider } from 'react-relay'
import { environment } from '@/environment'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { PrivacyModeProvider } from '@/hooks/use-privacy-mode'

export const Route = createRootRoute({
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <PrivacyModeProvider>
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
        <TailwindIndicator />
      </PrivacyModeProvider>
    </RelayEnvironmentProvider>
  )
}
