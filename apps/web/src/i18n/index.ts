import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './en'
import { es } from './es'

const storageKey = 'portfolio-language'
let language: 'en' | 'es' = 'en'

try {
  if (localStorage.getItem(storageKey) === 'es') language = 'es'
} catch {
  // Language selection still works when storage is unavailable.
}

document.documentElement.lang = language
void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, es: { translation: es } },
  lng: language,
  fallbackLng: 'en',
  supportedLngs: ['en', 'es'],
  initAsync: false,
  keySeparator: false,
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', value => {
  document.documentElement.lang = value
  try {
    localStorage.setItem(storageKey, value)
  } catch {
    // The selection remains active for this session.
  }
})
