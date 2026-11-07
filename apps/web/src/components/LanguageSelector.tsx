import { useTranslation } from 'react-i18next'

const languages = ['en', 'es'] as const

export function LanguageSelector() {
  const { t, i18n } = useTranslation()

  return <div className="language-selector" role="group" aria-label={t('language')}>
    {languages.map(language => <button
      key={language}
      type="button"
      lang={language}
      aria-label={language === 'en' ? 'English' : 'Español'}
      aria-pressed={i18n.resolvedLanguage === language}
      onClick={() => void i18n.changeLanguage(language)}
    >{language.toUpperCase()}</button>)}
  </div>
}
