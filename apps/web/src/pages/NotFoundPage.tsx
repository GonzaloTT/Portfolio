import { Link } from 'react-router'

export function NotFoundPage() {
  return <div className="container section">
    <span className="eyebrow">404 / Page not found</span>
    <h1>Let's get you back home.</h1>
    <p className="section-heading">This page doesn't exist. Explore the portfolio instead.</p>
    <Link className="button primary" to="/#home">Return to Home</Link>
  </div>
}

