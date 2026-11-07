import { useState } from 'react'

async function writeClipboard(value: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
      return
    }
  } catch {
    // Some browsers deny the async API; try a local selection-based copy.
  }

  const previousFocus = document.activeElement as HTMLElement | null
  const field = document.createElement('textarea')
  field.value = value
  field.setAttribute('readonly', '')
  field.setAttribute('aria-label', 'Text to copy')
  field.style.cssText = 'position:fixed;left:-9999px;top:0;'
  document.body.append(field)
  try {
    field.select()
    if (!document.execCommand('copy')) throw new Error('Clipboard unavailable')
  } finally {
    field.remove()
    previousFocus?.focus({ preventScroll: true })
  }
}

export function useClipboard() {
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function copy(value: string, label: string) {
    setBusy(true)
    try {
      await writeClipboard(value)
      setMessage(`${label} copied to clipboard.`)
    } catch {
      setMessage('Copy is unavailable in this browser. Select and copy the profile ID or link shown on the card.')
    } finally {
      setBusy(false)
    }
  }

  return { copy, message, busy }
}

