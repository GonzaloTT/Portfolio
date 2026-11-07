import { useTranslation } from 'react-i18next'
import { ArrowRight, ArrowUpRight, Database, Download, GitFork, Link2, Mail, Monitor, PenTool, ShieldCheck, Smartphone, Wrench } from 'lucide-react'
import { Link } from 'react-router'
import { EducationCards } from '../components/EducationCards'
import { ImagePlaceholder } from '../components/ImagePlaceholder'
import { SectionHeading } from '../components/SectionHeading'
import { ProjectsCarousel } from '../components/ProjectsCarousel'
import { WhatsAppLink } from '../components/WhatsAppLink'
import { profile } from '../data/profile'
import { skillGroups } from '../data/skills'
import '../styles/home.css'

const skillIcons = { frontend: Monitor, backend: Database, mobile: Smartphone, tools: Wrench, design: PenTool, systems: ShieldCheck }

export function HomePage() {
  const { t } = useTranslation()
  return <div className="container home-page">
    <section id="home" tabIndex={-1} className="hero section">
      <div className="hero-copy">
        <span className="availability"><span />{t('open').toLocaleUpperCase()}</span>
        <h1>{profile.name}</h1>
        <h2>{t('title')}</h2>
        <p className="hero-secondary-title">{t('secondaryTitle')}</p>
        <p className="hero-intro">{t('hero')}</p>
        <div className="button-row">
          <Link className="button primary" to="/#projects">{t('viewProjects')} <ArrowRight size={17} /></Link>
          <Link className="button secondary" to="/#contact"><Mail size={17} />{t('contactMe')}</Link>
        </div>
      </div>
      <ImagePlaceholder kind="portrait" name={t('portraitAlt')} src={profile.portraitPath} available={profile.portraitAvailable} />
    </section>

    <section id="about" tabIndex={-1} className="section">
      <SectionHeading label={t('profileSection')} title={t('beyond')} />
      <div className="about-grid">
        <article className="panel biography">
          <span className="eyebrow">{t('background')}</span>
          <p>{t('bio')}</p>
          <div className="tags"><span>{t('engineering')}</span><span>{t('userDesign')}</span><span>{t('workflows')}</span></div>
        </article>
        <EducationCards />
      </div>
    </section>

    <section id="projects" tabIndex={-1} className="section">
      <SectionHeading label={t('portfolioSection')} title={t('selectedWork')} description={t('workIntro')} />
      <ProjectsCarousel />
    </section>

    <section id="skills" tabIndex={-1} className="section">
      <SectionHeading label={t('skillsSection')} title={t('stack')} />
      <div className="skills-grid">
        {skillGroups.map(group => {
          const Icon = skillIcons[group.icon]
          return <article className="panel skill-card" key={group.icon}><Icon className="tile-icon" size={38} aria-hidden="true" /><h3>{t(`skillGroup.${group.icon}`)}</h3><div className="tags">{group.items.map(item => <span key={item}>{t(`technology.${item}`, { defaultValue: item })}</span>)}</div></article>
        })}
      </div>
    </section>

    <section id="contact" tabIndex={-1} className="section contact-section">
      <div className="panel contact-panel">
        <span className="eyebrow">{t('contactSection')}</span>
        <h2>{t('buildTogether')}</h2>
        <p>{t('contactIntro')}</p>
        <div className="button-row contact-actions">
          <a className="button primary" href={`mailto:${profile.email}`}><Mail size={17} aria-hidden="true" /><span>{profile.email}</span></a>
          <a className="button secondary" href={profile.cvUrl} download="Gonzalo_Magana_Segovia_CV.pdf"><Download size={17} aria-hidden="true" />{t('download')}</a>
        </div>
        <div className="contact-links">
          <WhatsAppLink className="contact-whatsapp" showNumber />
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer"><GitFork size={16} aria-hidden="true" />GitHub / GonzaloTT <ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer"><Link2 size={16} aria-hidden="true" />LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  </div>
}

