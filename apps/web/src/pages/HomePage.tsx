import { ArrowRight, ArrowUpRight, Database, Download, GitFork, Link2, Mail, Monitor, PenTool, ShieldCheck, Smartphone, Wrench } from 'lucide-react'
import { Link } from 'react-router'
import { EducationCards } from '../components/EducationCards'
import { ImagePlaceholder } from '../components/ImagePlaceholder'
import { SectionHeading } from '../components/SectionHeading'
import { ProjectsCarousel } from '../components/ProjectsCarousel'
import { profile } from '../data/profile'
import { skillGroups } from '../data/skills'
import '../styles/home.css'

const skillIcons = { frontend: Monitor, backend: Database, mobile: Smartphone, tools: Wrench, design: PenTool, systems: ShieldCheck }

export function HomePage() {
  return <div className="container home-page">
    <section id="home" tabIndex={-1} className="hero section">
      <div className="hero-copy">
        <span className="availability"><span />OPEN TO WORK</span>
        <h1>{profile.name}</h1>
        <h2>{profile.title}</h2>
        <p className="hero-secondary-title">{profile.secondaryTitle}</p>
        <p className="hero-intro">I develop web and mobile applications, combining software engineering, modern technologies, and user-centered design to build functional and scalable digital solutions.</p>
        <div className="button-row">
          <Link className="button primary" to="/#projects">View Projects <ArrowRight size={17} /></Link>
          <Link className="button secondary" to="/#contact"><Mail size={17} />Contact Me</Link>
        </div>
      </div>
      <ImagePlaceholder kind="portrait" name="Professional portrait of Gonzalo Magaña Segovia" src={profile.portraitPath} available={profile.portraitAvailable} />
    </section>

    <section id="about" tabIndex={-1} className="section">
      <SectionHeading label="01 / Profile" title="Beyond the Code" />
      <div className="about-grid">
        <article className="panel biography">
          <span className="eyebrow">Background & focus</span>
          <p>I’m interested in software engineering across the stack, from frontend interfaces and backend services to mobile apps. I also explore UX/UI design and embedded systems, with an interest in how software connects people and devices.</p>
          <div className="tags"><span>Software engineering</span><span>User-centered design</span><span>Business workflows</span></div>
        </article>
        <EducationCards />
      </div>
    </section>

    <section id="projects" tabIndex={-1} className="section">
      <SectionHeading label="02 / Portfolio" title="Selected Work" description="A closer look at my project portfolio." />
      <ProjectsCarousel />
    </section>

    <section id="skills" tabIndex={-1} className="section">
      <SectionHeading label="03 / Competencies" title="Tech Stack" />
      <div className="skills-grid">
        {skillGroups.map(group => {
          const Icon = skillIcons[group.icon]
          return <article className="panel skill-card" key={group.name}><Icon className="tile-icon" size={38} aria-hidden="true" /><h3>{group.name}</h3><div className="tags">{group.items.map(item => <span key={item}>{item}</span>)}</div></article>
        })}
      </div>
    </section>

    <section id="contact" tabIndex={-1} className="section contact-section">
      <div className="panel contact-panel">
        <span className="eyebrow">04 / Get in touch</span>
        <h2>Let's Build Something Together</h2>
        <p>Have a project, an opportunity, or an idea? Let's connect.</p>
        <div className="button-row contact-actions">
          {profile.email ? <a className="button primary" href={`mailto:${profile.email}`}><Mail size={17} />Send Email</a> : <button className="button primary" disabled><Mail size={17} />Email — coming soon</button>}
          {profile.cvUrl ? <a className="button secondary" href={profile.cvUrl} download><Download size={17} />Download CV</a> : <button className="button secondary" disabled><Download size={17} />CV — coming soon</button>}
        </div>
        <div className="contact-links">
          <a href={profile.githubUrl} target="_blank" rel="noreferrer"><GitFork size={16} />GitHub / GonzaloTT <ArrowUpRight size={14} /></a>
          {profile.linkedinUrl ? <a href={profile.linkedinUrl} target="_blank" rel="noreferrer"><Link2 size={16} />LinkedIn <ArrowUpRight size={14} /></a> : <span><Link2 size={16} />LinkedIn — URL pending</span>}
        </div>
      </div>
    </section>
  </div>
}

