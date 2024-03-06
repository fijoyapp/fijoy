import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_public/pricing')({
  component: () => <div>Hello /_public/pricing!</div>
})