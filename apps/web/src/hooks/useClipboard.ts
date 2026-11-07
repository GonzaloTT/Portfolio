import { useState } from 'react'
import { useTranslation } from 'react-i18next'

async function writeClipboard(value: string, fieldLabel: string) {
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
  field.setAttribute('aria-label', fieldLabel)
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
  const { t } = useTranslation()
  const [messageKey, setMessageKey] = useState<'copiedId' | 'copiedLink' | 'copyUnavailable' | null>(null)
  const [busy, setBusy] = useState(false)

  async function copy(value: string, successKey: 'copiedId' | 'copiedLink') {
    setBusy(true)
    try {
      await writeClipboard(value, t('textToCopy'))
      setMessageKey(successKey)
    } catch {
      setMessageKey('copyUnavailable')
    } finally {
      setBusy(false)
    }
  }

  return { copy, message: messageKey ? t(messageKey) : '', busy }
}

