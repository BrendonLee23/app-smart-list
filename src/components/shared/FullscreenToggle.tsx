'use client'

import { useEffect, useSyncExternalStore, useState } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const subscribe = () => () => {}
const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

export function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const isClient = useIsClient()

  useEffect(() => {
    function onChange() {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  async function toggle() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

  if (!isClient) return <Button variant="ghost" size="icon" disabled aria-label="Tela cheia" />

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isFullscreen ? 'Sair da tela cheia' : 'Entrar em tela cheia'}
    >
      {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
    </Button>
  )
}
