import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Copy, Link2, QrCode } from 'lucide-react'
import { Link } from 'react-router'
import { profile } from '../data/profile'
import { useClipboard } from '../hooks/useClipboard'
import '../styles/connect.css'

export function ConnectPage() {
  const { copy, message, busy } = useClipboard()
  const [otherId, setOtherId] = useState('')
  const [connectionMessage, setConnectionMessage] = useState('')
  const profileLink = new URL('#/connect', profile.portfolioUrl).href

  function handleConnect(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setConnectionMessage('Connections are not available yet. No request has been sent. Please use the contact options on the portfolio.')
  }

  return <div className="container connect-page">
    <div className="connect-topline">
      <Link className="back-link mono" to="/#home"><ArrowLeft size={15} />RETURN TO OVERVIEW</Link>
      <span className="availability"><span />OPEN TO WORK</span>
    </div>
    <div className="connect-title"><span className="eyebrow">A professional introduction</span><h1>Connect with Me</h1><p>Keep my professional profile close. Share the link or copy my profile identifier.</p></div>
    <section className="panel identity-card" aria-labelledby="identity-name">
      <div className="identity-heading">
        <span className="identity-avatar" aria-hidden="true">GM</span>
        <div><h2 id="identity-name">{profile.name}</h2><p>{profile.title}</p></div>
      </div>
      <div className="profile-identifier"><span className="mono">PROFILE ID</span><code>{profile.id}</code></div>
      <div className="qr-placeholder" role="img" aria-label="QR code placeholder. This is not a scannable QR code.">
        <QrCode size={156} strokeWidth={1.4} aria-hidden="true" />
        <span className="mono">QR CODE PLACEHOLDER</span>
        <p>Not scannable yet</p>
      </div>
      <p className="identity-description">A simple card for sharing my portfolio. QR sharing and professional connections are planned for a future release.</p>
      <a className="profile-link mono" href={profileLink}>{profileLink}</a>
      <div className="identity-actions">
        <button className="button secondary" disabled={busy} onClick={() => void copy(profile.id, 'Profile ID')}><Copy size={17} />Copy Profile ID</button>
        <button className="button primary" disabled={busy} onClick={() => void copy(profileLink, 'Profile link')}><Link2 size={17} />Copy Profile Link</button>
      </div>
      <p className="clipboard-status" role="status" aria-live="polite">{message}</p>
    </section>
    <section className="panel connect-form-panel" aria-labelledby="another-profile">
      <div className="connect-form-heading"><h2 id="another-profile">Connect another profile</h2><span className="pending-label mono">COMING SOON</span></div>
      <p id="connect-help">Professional connections are not available yet. This preview does not send or store your input.</p>
      <form onSubmit={handleConnect}>
        <label htmlFor="profile-identifier">Profile identifier</label>
        <div className="connect-input-row">
          <input id="profile-identifier" name="profileId" value={otherId} onChange={event => { setOtherId(event.target.value); setConnectionMessage('') }} placeholder="Enter a profile ID" autoComplete="off" maxLength={120} required pattern=".*\S.*" aria-describedby="connect-help" />
          <button type="submit" className="button secondary">Connect <ArrowRight size={17} /></button>
        </div>
        <p className="connection-status" role="status" aria-live="polite">{connectionMessage}</p>
      </form>
      {connectionMessage && <Link className="text-link" to="/#contact">View contact options <ArrowRight size={14} /></Link>}
    </section>
  </div>
}

