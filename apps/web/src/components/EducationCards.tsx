import { useTranslation } from 'react-i18next'
import { GraduationCap, Code2 } from 'lucide-react'

export function EducationCards() {
  const { t } = useTranslation()
  return <div className="education-cards">
    <article className="panel education-card">
      <GraduationCap className="tile-icon" size={38} aria-hidden="true" />
      <span className="eyebrow">{t('degree')}</span>
      <h3>Universidad Mondragón México</h3>
      <p>{t('degreeTitle')}</p>
    </article>
    <article className="panel education-card">
      <Code2 className="tile-icon accent" size={38} aria-hidden="true" />
      <span className="eyebrow">{t('training')}</span>
      <h3>TripleTen</h3>
      <p>{t('fullStackBootcamp')}<br />{t('designBootcamp')}</p>
    </article>
  </div>
}

