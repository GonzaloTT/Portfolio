import { ArrowLeft, ArrowRight, Building2, Layers, Monitor, Wrench } from 'lucide-react'
import { Link } from 'react-router'
import { experiences } from '../data/experience'
import { projects } from '../data/projects'
import '../styles/experience.css'

const areaIcons = [Layers, Monitor, Wrench]

export function ExperiencePage() {
  return <div className="container experience-page">
    <section className="section experience-intro">
      <Link className="back-link mono" to="/#home"><ArrowLeft size={15} />BACK TO HOME / CAREER</Link>
      <span className="eyebrow">Engineering in practice</span>
      <h1>Professional Experience</h1>
    </section>
    <div className="experience-roles">
      {experiences.map(experience => <section className="panel role-panel" key={experience.id} aria-labelledby={`company-${experience.id}`}>
        <div className="role-heading">
          <Building2 className="tile-icon" size={56} aria-hidden="true" />
          <div><h2 id={`company-${experience.id}`}>{experience.company}</h2><p>{experience.role}</p></div>
        </div>
        <p className="role-summary">{experience.summary}</p>
        <div className="experience-grid">
          {experience.areas.map((area, index) => {
            const Icon = areaIcons[index]
            return <article className="experience-area" key={area.title}>
              <div className="area-top"><Icon className="tile-icon" size={38} aria-hidden="true" /><span className="mono" aria-hidden="true">0{index + 1}</span></div>
              <h3>{area.title}</h3><p>{area.description}</p>
            </article>
          })}
        </div>
        <ul className="role-technologies tags" aria-label={`${experience.company} technologies`}>
          {experience.technologies.map(technology => <li key={technology}><span>{technology}</span></li>)}
        </ul>
        {experience.clientProjects && <div className="client-projects">
          <h3>Selected Client Projects</h3>
          <ul className="client-project-list">
            {experience.clientProjects.map(({ projectId, description }) => {
              const project = projects.find(item => item.id === projectId)
              if (!project) return null
              return <li key={project.id}>
                <Link to={{ pathname: '/', search: `?project=${encodeURIComponent(project.id)}`, hash: '#projects' }}>
                  <strong>{project.name}</strong><ArrowRight size={16} aria-hidden="true" />
                  <span>{description}</span>
                </Link>
              </li>
            })}
          </ul>
        </div>}
      </section>)}
    </div>
    <section className="panel experience-cta">
      <div><span className="eyebrow">Next steps</span><h2>Interested in working together?</h2><p>Explore my selected work or get in touch.</p></div>
      <div className="button-row"><Link className="button secondary" to="/#projects">View Selected Projects</Link><Link className="button primary" to="/#contact">Get in Touch <ArrowRight size={17} /></Link></div>
    </section>
  </div>
}
