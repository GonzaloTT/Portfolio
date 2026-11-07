import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown, Download, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'

declare const __CV_FILES__: readonly string[]

const documents = {
  en: { source: 'Gonzalo_Magaña_CV.pdf', label: 'English', description: 'English résumé' },
  es: { source: 'Gonzalo_Magaña_CV_ES.pdf', label: 'Español', description: 'Currículum en español' },
} as const
const languages = ['en', 'es'] as const
type CvLanguage = typeof languages[number]
const missing = languages.filter(language => !__CV_FILES__.includes(documents[language].source))

export function CvDownload() {
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  return <CvOptions key={language} initialLanguage={language} />
}

function CvOptions({ initialLanguage }: { initialLanguage: CvLanguage }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(initialLanguage)
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', dismissOutside)
    return () => document.removeEventListener('pointerdown', dismissOutside)
  }, [open])

  function closeAndFocus() {
    setOpen(false)
    trigger.current?.focus()
  }

  return <div
    className="cv-download"
    ref={root}
    onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
    }}
    onKeyDown={event => {
      if (open && event.key === 'Escape') {
        event.preventDefault()
        closeAndFocus()
      }
    }}
  >
    <div className="cv-control">
      <button
        type="button"
        className="button primary cv-trigger"
        ref={trigger}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(!open)}
      >
        <Download size={17} aria-hidden="true" />
        <span>{t('download')}</span>
        <span className="cv-language mono" aria-hidden="true">{selected.toUpperCase()}</span>
        <span className="sr-only" lang={selected}>{documents[selected].label}</span>
        <ChevronDown className="cv-chevron" size={16} aria-hidden="true" />
      </button>
      <ul id={menuId} className="cv-menu" aria-label={t('cvLanguage')} inert={!open}>
        {languages.map(language => {
          const { source, label, description } = documents[language]
          const active = language === selected
          const content = <>
            <FileText className="cv-file" size={19} aria-hidden="true" />
            <span className="cv-option-text"><strong>{label}</strong><small>{description}</small></span>
            {active && <Check className="cv-check" size={17} aria-hidden="true" />}
          </>

          return <li key={language} lang={language}>
            {missing.includes(language)
              ? <button type="button" className="cv-option" disabled>{content}</button>
              : <a
                className="cv-option"
                href={`${import.meta.env.BASE_URL}cv/${encodeURIComponent(source)}`}
                download={`Gonzalo_Magana_Segovia_CV_${language.toUpperCase()}.pdf`}
                aria-current={active ? 'true' : undefined}
                onClick={() => {
                  setSelected(language)
                  closeAndFocus()
                }}
                onKeyDown={event => {
                  if (event.key === ' ') {
                    event.preventDefault()
                    event.currentTarget.click()
                  }
                }}
              >{content}</a>}
          </li>
        })}
      </ul>
    </div>
    {missing.length > 0 && <p className="cv-unavailable">
      {missing.map(language => t(language === 'en' ? 'cvEnglishUnavailable' : 'cvSpanishUnavailable')).join(' ')}
    </p>}
  </div>
}
