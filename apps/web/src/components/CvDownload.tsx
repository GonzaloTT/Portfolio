import { useState } from 'react'
import { Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'

declare const __CV_FILES__: readonly string[]

const documents = {
  en: { source: 'Gonzalo_Magaña_CV.pdf', label: 'English — Download CV' },
  es: { source: 'Gonzalo_Magaña_CV_ES.pdf', label: 'Español — Descargar CV' },
} as const
const languages = ['en', 'es'] as const
type CvLanguage = typeof languages[number]

export function CvDownload() {
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  return <CvOptions key={language} initialLanguage={language} />
}

function CvOptions({ initialLanguage }: { initialLanguage: CvLanguage }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(initialLanguage)
  const { source } = documents[selected]
  const available = __CV_FILES__.includes(source)
  const missing = languages.filter(language => !__CV_FILES__.includes(documents[language].source))

  return <div className="cv-download">
    <select aria-label={t('cvLanguage')} value={selected} onChange={event => setSelected(event.target.value === 'es' ? 'es' : 'en')}>
      {languages.map(language => <option key={language} value={language} lang={language} disabled={missing.includes(language)}>
        {documents[language].label}
      </option>)}
    </select>
    {available ? <a
      className="button secondary"
      href={`${import.meta.env.BASE_URL}cv/${encodeURIComponent(source)}`}
      download={`Gonzalo_Magana_Segovia_CV_${selected.toUpperCase()}.pdf`}
    ><Download size={17} aria-hidden="true" />{t('download')}</a> : <button className="button secondary" type="button" disabled>
      <Download size={17} aria-hidden="true" />{t('download')}
    </button>}
    {missing.length > 0 && <p className="cv-unavailable">
      {missing.map(language => t(language === 'en' ? 'cvEnglishUnavailable' : 'cvSpanishUnavailable')).join(' ')}
    </p>}
  </div>
}
