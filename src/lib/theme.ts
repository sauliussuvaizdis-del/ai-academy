import { useEffect, useState } from 'react'
import { writeString } from './storage'

export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  return {
    dark,
    toggle() {
      const next = !dark
      writeString('aipa-theme', next ? 'dark' : 'light')
      setDark(next)
    },
  }
}

/** True while the page is in dark mode; updates when the class on <html> changes. */
export function useIsDark() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(document.documentElement.classList.contains('dark')))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return dark
}

