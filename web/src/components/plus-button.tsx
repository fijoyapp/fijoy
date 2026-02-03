import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { commandStore } from '@/store'
import { PlusIcon } from 'lucide-react'

export const PlusButton = () => {
  return (
    <Link
      to={'.'}
      search={(prev) => ({
        ...prev,
        command_open: true,
      })}
    >
      <Button
        nativeButton={true}
        size="icon-xl"
        className="rounded-full"
        onClick={() => commandStore.setState('New ')}
      >
        <PlusIcon />
      </Button>
    </Link>
  )
}
