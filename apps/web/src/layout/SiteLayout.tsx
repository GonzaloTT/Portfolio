import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { LanguageSelector } from '../components/LanguageSelector'
import { WhatsAppLink } from '../components/WhatsAppLink'
import { navigation, profile } from '../data/profile'

function RoutePosition() {
  const { pathname, hash, key } = useLocation()
  const { t } = useTranslation()
  useEffect(() => {
    document.title = `${t(pathname === '/experience' ? 'experience' : pathname === '/connect' ? 'connect' : 'portfolio')} | ${profile.name}`
  }, [pathname, t])
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1))
        const smooth = pathname === '/' && target?.id !== 'main-content'
          && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        target?.scrollIntoView({ block: 'start', behavior: smooth ? 'smooth' : 'instant' })
        target?.focus({ preventScroll: true })
      } else {
        window.scrollTo(0, 0)
        document.getElementById('main-content')?.focus({ preventScroll: true })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])
  return null
}

export function SiteLayout() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  return <>
    <RoutePosition />
    <Link className="skip-link" to={{ pathname: location.pathname, search: location.search, hash: '#main-content' }}>{t('skip')}</Link>
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/#home" className="brand" onClick={() => setMenuOpen(false)} aria-label={t('brandHome')}>
          <span className="brand-monogram mono">GM</span>
          <span><strong>Gonzalo Magaña</strong><small>{t('headerSubtitle')}</small></span>
        </Link>
        <nav aria-label={t('mainNav')} className="desktop-nav">
          {navigation.map(({ label, to }) => <Link key={to} to={to} aria-current={location.pathname + location.hash === to ? 'location' : undefined}>{t(label)}</Link>)}
        </nav>
        <div className="header-actions">
          <span className="availability"><span />{t('open')}</span>
          <LanguageSelector />
          <WhatsAppLink className="icon-button header-whatsapp" />
          <NavLink to="/connect" className="button primary header-connect">{t('connect')}</NavLink>
          <button className="icon-button menu-toggle" aria-label={t(menuOpen ? 'menuClose' : 'menuOpen')} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav container" aria-label={t('mobileNav')} onKeyDown={event => { if (event.key === 'Escape') setMenuOpen(false) }}>
        {[...navigation, { label: 'connect', to: '/connect' }].map(({ label, to }) => <Link key={to} to={to} onClick={() => setMenuOpen(false)}>{t(label)}<ArrowUpRight size={16} /></Link>)}
      </nav>}
    </header>
    <main id="main-content" tabIndex={-1}><Outlet /></main>
    <footer className="site-footer">
      <div className="container footer-inner">
        <div><strong>{profile.name}</strong><p>{t('title')}</p></div>
        <nav aria-label={t('footerNav')}>
          <a href={`mailto:${profile.email}`}>{t('email')}</a>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
          <Link to="/#contact">{t('contact')}</Link>
          <Link to="/connect">{t('connectAction')}</Link>
        </nav>
        <small>© {new Date().getFullYear()} {profile.name}</small>
      </div>
    </footer>
    <WhatsAppLink className="icon-button floating-whatsapp" />
  </>
}

