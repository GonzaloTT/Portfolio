import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Copy, Link2, QrCode } from 'lucide-react'
import { Link } from 'react-router'
import { profile } from '../data/profile'
import { useClipboard } from '../hooks/useClipboard'
import '../styles/connect.css'

export function ConnectPage() {
  const { t } = useTranslation()
  const { copy, message, busy } = useClipboard()
  const [otherId, setOtherId] = useState('')
  const [connectionMessage, setConnectionMessage] = useState(false)
  const profileLink = new URL('#/connect', profile.portfolioUrl).href

  function handleConnect(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setConnectionMessage(true)
  }

  return <div className="container connect-page">
    <div className="connect-topline">
      <Link className="back-link mono" to="/#home"><ArrowLeft size={15} />{t('overview')}</Link>
      <span className="availability"><span />{t('open').toLocaleUpperCase()}</span>
    </div>
    <div className="connect-title"><span className="eyebrow">{t('professionalIntro')}</span><h1>{t('connect')}</h1><p>{t('connectIntro')}</p></div>
    <section className="panel identity-card" aria-labelledby="identity-name">
      <div className="identity-heading">
        <span className="identity-avatar" aria-hidden="true">GM</span>
        <div><h2 id="identity-name">{profile.name}</h2><p>{t('title')}</p></div>
      </div>
      <div className="profile-identifier"><span className="mono">{t('profileId')}</span><code>{profile.id}</code></div>
      <div className="qr-placeholder" role="img" aria-label={t('qrAlt')}>
        <QrCode size={156} strokeWidth={1.4} aria-hidden="true" />
        <span className="mono">{t('qr')}</span>
        <p>{t('notScannable')}</p>
      </div>
      <p className="identity-description">{t('identityIntro')}</p>
      <a className="profile-link mono" href={profileLink}>{profileLink}</a>
      <div className="identity-actions">
        <button className="button secondary" disabled={busy} onClick={() => void copy(profile.id, 'copiedId')}><Copy size={17} />{t('copyId')}</button>
        <button className="button primary" disabled={busy} onClick={() => void copy(profileLink, 'copiedLink')}><Link2 size={17} />{t('copyLink')}</button>
      </div>
      <p className="clipboard-status" role="status" aria-live="polite">{message}</p>
    </section>
    <section className="panel connect-form-panel" aria-labelledby="another-profile">
      <div className="connect-form-heading"><h2 id="another-profile">{t('anotherProfile')}</h2><span className="pending-label mono">{t('soon')}</span></div>
      <p id="connect-help">{t('connectionHelp')}</p>
      <form onSubmit={handleConnect}>
        <label htmlFor="profile-identifier">{t('identifier')}</label>
        <div className="connect-input-row">
          <input id="profile-identifier" name="profileId" value={otherId} onChange={event => { setOtherId(event.target.value); setConnectionMessage(false) }} placeholder={t('enterId')} autoComplete="off" maxLength={120} required pattern=".*\S.*" aria-describedby="connect-help" />
          <button type="submit" className="button secondary">{t('connectAction')} <ArrowRight size={17} /></button>
        </div>
        <p className="connection-status" role="status" aria-live="polite">{connectionMessage && t('connectionUnavailable')}</p>
      </form>
      {connectionMessage && <Link className="text-link" to="/#contact">{t('contactOptions')} <ArrowRight size={14} /></Link>}
    </section>
  </div>
}

