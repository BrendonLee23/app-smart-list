'use client'

import { useEffect, useState } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(false)

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
