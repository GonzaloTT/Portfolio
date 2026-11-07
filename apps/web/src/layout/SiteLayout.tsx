import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { navigation, profile } from '../data/profile'

function RoutePosition() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    document.title = `${pathname === '/experience' ? 'Experience' : pathname === '/connect' ? 'Connect with Me' : 'Portfolio'} | ${profile.name}`
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
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  return <>
    <RoutePosition />
    <Link className="skip-link" to={{ pathname: location.pathname, search: location.search, hash: '#main-content' }}>Skip to content</Link>
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/#home" className="brand" onClick={() => setMenuOpen(false)} aria-label="Gonzalo Magaña — Home">
          <span className="brand-monogram mono">GM</span>
          <span><strong>Gonzalo Magaña</strong><small>{profile.headerSubtitle}</small></span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map(({ label, to }) => <Link key={to} to={to} aria-current={location.pathname + location.hash === to ? 'location' : undefined}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <span className="availability"><span />Open to Work</span>
          <NavLink to="/connect" className="button primary header-connect">Connect with Me</NavLink>
          <button className="icon-button menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav container" aria-label="Mobile navigation" onKeyDown={event => { if (event.key === 'Escape') setMenuOpen(false) }}>
        {[...navigation, { label: 'Connect with Me', to: '/connect' }].map(({ label, to }) => <Link key={to} to={to} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={16} /></Link>)}
      </nav>}
    </header>
    <main id="main-content" tabIndex={-1}><Outlet /></main>
    <footer className="site-footer">
      <div className="container footer-inner">
        <div><strong>{profile.name}</strong><p>{profile.title}</p></div>
        <nav aria-label="Footer navigation"><a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><Link to="/#contact">Contact</Link><Link to="/connect">Connect</Link></nav>
        <small>© {new Date().getFullYear()} {profile.name}</small>
      </div>
    </footer>
  </>
}

