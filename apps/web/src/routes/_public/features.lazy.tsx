import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_public/features')({
  component: () => <div>Hello /_public/features!</div>
})