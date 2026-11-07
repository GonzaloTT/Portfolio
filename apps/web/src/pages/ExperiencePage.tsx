import { ArrowLeft, ArrowRight, Building2, Layers, Monitor, Wrench } from 'lucide-react'
import { Link } from 'react-router'
import { experienceAreas } from '../data/experience'
import '../styles/experience.css'

const areaIcons = [Layers, Monitor, Wrench]

export function ExperiencePage() {
  return <div className="container experience-page">
    <section className="section experience-intro">
      <Link className="back-link mono" to="/#home"><ArrowLeft size={15} />BACK TO HOME / CAREER</Link>
      <span className="eyebrow">Engineering in practice</span>
      <h1>Professional Experience</h1>
    </section>
    <section className="panel role-panel" aria-labelledby="company-heading">
      <div className="role-heading">
        <Building2 className="tile-icon" size={56} aria-hidden="true" />
        <div><h2 id="company-heading">King Global Cargo (KGC)</h2><p>IT & Software Development Intern</p></div>
      </div>
      <p className="role-summary">Development of internal software tools, enterprise interfaces, and digital solutions supporting logistics operations.</p>
      <div className="experience-grid">
        {experienceAreas.map((area, index) => {
          const Icon = areaIcons[index]
          return <article className="experience-area" key={area.title}>
            <div className="area-top"><Icon className="tile-icon" size={38} aria-hidden="true" /><span className="mono">0{index + 1}</span></div>
            <h3>{area.title}</h3><p>{area.description}</p>
          </article>
        })}
      </div>
    </section>
    <section className="panel experience-cta">
      <div><span className="eyebrow">Next steps</span><h2>Interested in working together?</h2><p>Explore my selected work or get in touch.</p></div>
      <div className="button-row"><Link className="button secondary" to="/#projects">View Selected Projects</Link><Link className="button primary" to="/#contact">Get in Touch <ArrowRight size={17} /></Link></div>
    </section>
  </div>
}

