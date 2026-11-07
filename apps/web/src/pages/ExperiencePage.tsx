import { ArrowLeft, ArrowRight, Building2, Layers, Monitor, Wrench } from 'lucide-react'
import { Link } from 'react-router'
import { EducationCards } from '../components/EducationCards'
import { SectionHeading } from '../components/SectionHeading'
import { experienceAreas, experienceTechnologies } from '../data/experience'
import '../styles/experience.css'

const areaIcons = [Layers, Monitor, Wrench]

export function ExperiencePage() {
  return <div className="container experience-page">
    <section className="section experience-intro">
      <Link className="back-link mono" to="/#home"><ArrowLeft size={15} />BACK TO HOME / CAREER</Link>
      <span className="eyebrow">Engineering in practice</span>
      <h1>Professional Experience</h1>
      <p>Building practical solutions through software engineering.</p>
    </section>
    <section className="panel role-panel" aria-labelledby="company-heading">
      <div className="role-heading">
        <Building2 className="tile-icon" size={56} aria-hidden="true" />
        <div><h2 id="company-heading">King Global Cargo</h2><p>IT & Software Development</p></div>
      </div>
      <p className="role-summary">Internal software, business workflow digitalization, and technical support in a logistics environment.</p>
      <div className="experience-grid">
        {experienceAreas.map((area, index) => {
          const Icon = areaIcons[index]
          return <article className="experience-area" key={area.title}>
            <div className="area-top"><Icon className="tile-icon" size={38} aria-hidden="true" /><span className="mono">0{index + 1}</span></div>
            <h3>{area.title}</h3><p>{area.description}</p><span className="eyebrow">{area.label}</span>
          </article>
        })}
      </div>
      <div className="role-technologies"><span className="mono">TECHNOLOGIES & TOOLS</span><div className="tags">{experienceTechnologies.map(technology => <span key={technology}>{technology}</span>)}</div></div>
    </section>
    <section className="section" aria-label="Education and training">
      <SectionHeading label="Academic foundation" title="Education & Specialized Training" />
      <EducationCards />
    </section>
    <section className="panel experience-cta">
      <div><span className="eyebrow">Next steps</span><h2>Interested in working together?</h2><p>Explore my selected work or get in touch.</p></div>
      <div className="button-row"><Link className="button secondary" to="/#projects">View Selected Projects</Link><Link className="button primary" to="/#contact">Get in Touch <ArrowRight size={17} /></Link></div>
    </section>
  </div>
}

