import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export function NotFoundPage() {
  const { t } = useTranslation()
  return <div className="container section">
    <span className="eyebrow">{t('notFound')}</span>
    <h1>{t('backHomeHeading')}</h1>
    <p className="section-heading">{t('notFoundIntro')}</p>
    <Link className="button primary" to="/#home">{t('backHome')}</Link>
  </div>
}

