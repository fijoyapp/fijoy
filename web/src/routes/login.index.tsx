import { createFileRoute, Link } from '@tanstack/react-router'
import { LoginForm } from '@/components/login-form'
import { Logo } from '@/components/logo'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex w-auto flex-col items-center justify-center font-medium"
        >
          <Logo size={128} className="rounded-xl" />
          <span>Beaver Money</span>
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
