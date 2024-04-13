import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/workspace/$namespace/stocks/')({
  component: () => <div>Hello /_protected/workspace/$namespace/stocks/!</div>
})