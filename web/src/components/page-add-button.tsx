import { Link } from '@tanstack/react-router'
import type { LinkOptions } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

type PageAddButtonProps = LinkOptions & {
  label: string
}

export function PageAddButton({ label, ...linkOptions }: PageAddButtonProps) {
  return (
    <Button
      variant="outline"
      render={<Link {...linkOptions} />}
      className="bg-background shrink-0"
    >
      <PlusIcon data-icon="inline-start" />
      {label}
    </Button>
  )
}
