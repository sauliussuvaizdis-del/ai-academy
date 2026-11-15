import { useState } from 'react'

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older mobile browsers
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    ta.remove()
    return ok
  }
}

export function CopyButton({ text, label = 'Copy', className = 'btn-ghost' }: { text: string; label?: string; className?: string }) {
  const [state, setState] = useState<'idle' | 'ok' | 'fail'>('idle')
  return (
    <button
      className={className}
      onClick={async () => {
        setState((await copyText(text)) ? 'ok' : 'fail')
        setTimeout(() => setState('idle'), 2500)
      }}
    >
      {state === 'ok' ? '✔ Copied' : state === 'fail' ? 'Copy failed: select the text manually' : label}
    </button>
  )
}
