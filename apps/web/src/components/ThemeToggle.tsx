import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function ThemeToggle() {
  const { t } = useTranslation()
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const label = t(nextTheme === 'light' ? 'switchLight' : 'switchDark')
  const Icon = nextTheme === 'light' ? Sun : Moon

  function toggleTheme() {
    document.documentElement.dataset.theme = nextTheme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', nextTheme === 'light' ? '#F5F7F3' : '#080B09')
    setTheme(nextTheme)
    try {
      localStorage.setItem('portfolio-theme', nextTheme)
    } catch {
      // The selected theme still applies for this session.
    }
  }

  return <button type="button" className="icon-button theme-toggle" aria-label={label} title={label} onClick={toggleTheme}>
    <Icon aria-hidden="true" />
  </button>
}
