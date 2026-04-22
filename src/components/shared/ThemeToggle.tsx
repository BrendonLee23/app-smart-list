'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeContext'

const subscribe = () => () => {}
const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isClient = useIsClient()

  if (!isClient) return <Button variant="ghost" size="icon" disabled aria-label="Tema" />

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
