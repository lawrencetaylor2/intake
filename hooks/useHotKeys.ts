'use client'
import { useEffect } from 'react'
import { isAppleDevice } from '@/lib/utils'

// Define the type for the hotkey handler function
type HotkeyHandler = () => void

export const useHotkeys = (handler: HotkeyHandler) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = isAppleDevice()
      // Check for Ctrl key on Windows/Linux or Meta (Command) on Mac
      const isModifierPressed = isMac ? event.metaKey : event.ctrlKey

      if (isModifierPressed && event.code === 'Space') {
        event.preventDefault() // Prevents default browser behavior (e.g., scrolling)
        handler()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handler])
}
