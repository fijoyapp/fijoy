import { useEffect, useRef } from 'react'
import { RefreshCwIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useRegisterSW } from 'virtual:pwa-register/react'

const MIN_UPDATE_CHECK_INTERVAL_MS = 60_000
const UPDATE_TOAST_ID = 'pwa-update-available'

export function PwaUpdatePrompt() {
  const registrationRef = useRef<ServiceWorkerRegistration>(null)
  const lastUpdateCheckRef = useRef(0)
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onRegisteredSW: (_serviceWorkerUrl, registration) => {
      registrationRef.current = registration ?? null
      lastUpdateCheckRef.current = Date.now()
    },
  })

  useEffect(() => {
    const checkForUpdate = () => {
      const registration = registrationRef.current
      const now = Date.now()

      if (
        document.visibilityState !== 'visible' ||
        !navigator.onLine ||
        !registration ||
        registration.installing ||
        now - lastUpdateCheckRef.current < MIN_UPDATE_CHECK_INTERVAL_MS
      ) {
        return
      }

      lastUpdateCheckRef.current = now
      void registration.update().catch(() => {
        // A failed update check is expected while connectivity is changing.
        // The next launch, foreground, or online event will try again.
      })
    }

    document.addEventListener('visibilitychange', checkForUpdate)
    window.addEventListener('online', checkForUpdate)

    return () => {
      document.removeEventListener('visibilitychange', checkForUpdate)
      window.removeEventListener('online', checkForUpdate)
    }
  }, [])

  useEffect(() => {
    if (!needRefresh) {
      toast.dismiss(UPDATE_TOAST_ID)
      return
    }

    toast('Update available', {
      id: UPDATE_TOAST_ID,
      description: 'Reload to use the latest version of Beaver Money.',
      duration: Infinity,
      dismissible: false,
      icon: <RefreshCwIcon className="size-4" aria-hidden="true" />,
      action: {
        label: 'Update',
        onClick: () => void updateServiceWorker(true),
      },
      cancel: {
        label: 'Later',
        onClick: () => setNeedRefresh(false),
      },
    })

    return () => {
      toast.dismiss(UPDATE_TOAST_ID)
    }
  }, [needRefresh, setNeedRefresh, updateServiceWorker])

  return null
}
