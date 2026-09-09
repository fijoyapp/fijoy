import * as React from 'react'
import { cn } from '@/lib/utils'
import { controlSurfaceClassName } from '@/components/ui/control-surface'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        controlSurfaceClassName,
        'placeholder:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex field-sizing-content min-h-16 w-full resize-none px-2 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-2 md:text-xs/relaxed',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
