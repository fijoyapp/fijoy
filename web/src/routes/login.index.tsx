import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/components/login-form'
import { FijoyLogo } from '@/components/fijoy-logo'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <FijoyLogo size={24} className="rounded-xl" />
          </div>
          Fijoy
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
