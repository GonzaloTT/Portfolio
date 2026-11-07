import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Building2, Layers, Monitor, Wrench } from 'lucide-react'
import { Link } from 'react-router'
import { experiences } from '../data/experience'
import { projects } from '../data/projects'
import '../styles/experience.css'

const areaIcons = [Layers, Monitor, Wrench]

export function ExperiencePage() {
  const { t } = useTranslation()
  return <div className="container experience-page">
    <section className="section experience-intro">
      <Link className="back-link mono" to="/#home"><ArrowLeft size={15} />{t('backCareer')}</Link>
      <span className="eyebrow">{t('inPractice')}</span>
      <h1>{t('professionalExperience')}</h1>
    </section>
    <div className="experience-roles">
      {experiences.map(experience => <section className="panel role-panel" key={experience.id} aria-labelledby={`company-${experience.id}`}>
        <div className="role-heading">
          <Building2 className="tile-icon" size={56} aria-hidden="true" />
          <div><h2 id={`company-${experience.id}`}>{experience.company}</h2><p>{t(`experience.${experience.id}.role`)}</p></div>
        </div>
        <p className="role-summary">{t(`experience.${experience.id}.summary`)}</p>
        <div className="experience-grid">
          {experience.areas.map((area, index) => {
            const Icon = areaIcons[index]
            return <article className="experience-area" key={area}>
              <div className="area-top"><Icon className="tile-icon" size={38} aria-hidden="true" /><span className="mono" aria-hidden="true">0{index + 1}</span></div>
              <h3>{t(`experience.${experience.id}.${area}.title`)}</h3><p>{t(`experience.${experience.id}.${area}.description`)}</p>
            </article>
          })}
        </div>
        <ul className="role-technologies tags" aria-label={t('companyTech', { name: experience.company })}>
          {experience.technologies.map(technology => <li key={technology}><span>{technology}</span></li>)}
        </ul>
        {experience.clientProjects && <div className="client-projects">
          <h3>{t('clientProjects')}</h3>
          <ul className="client-project-list">
            {experience.clientProjects.map(projectId => {
              const project = projects.find(item => item.id === projectId)
              if (!project) return null
              return <li key={project.id}>
                <Link to={{ pathname: '/', search: `?project=${encodeURIComponent(project.id)}`, hash: '#projects' }}>
                  <strong>{project.name}</strong><ArrowRight size={16} aria-hidden="true" />
                  <span>{t(`client.${project.id}`)}</span>
                </Link>
              </li>
            })}
          </ul>
        </div>}
      </section>)}
    </div>
    <section className="panel experience-cta">
      <div><span className="eyebrow">{t('nextSteps')}</span><h2>{t('workTogether')}</h2><p>{t('exploreWork')}</p></div>
      <div className="button-row"><Link className="button secondary" to="/#projects">{t('viewSelected')}</Link><Link className="button primary" to="/#contact">{t('getInTouch')} <ArrowRight size={17} /></Link></div>
    </section>
  </div>
}
