import * as React from 'react'
import { Input as InputPrimitive } from '@base-ui/react/input'
import { cn } from '@/lib/utils'
import { controlSurfaceClassName } from '@/components/ui/control-surface'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        controlSurfaceClassName,
        'file:text-foreground placeholder:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-7 w-full min-w-0 appearance-none px-2 py-0.5 text-sm file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-2 md:text-xs/relaxed',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
