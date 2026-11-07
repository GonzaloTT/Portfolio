import { useTranslation } from 'react-i18next'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink, GitFork } from 'lucide-react'
import { useLocation } from 'react-router'
import { projects } from '../data/projects'
import { ProjectGallery } from './ProjectGallery'
import '../styles/projects.css'

export function ProjectsCarousel() {
  const { t } = useTranslation()
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const { search, key } = useLocation()

  const goTo = useCallback((index: number, behavior?: ScrollBehavior) => {
    const element = track.current?.children[index] as HTMLElement | undefined
    if (!element || !track.current) return
    track.current.scrollTo({
      left: element.offsetLeft,
      behavior: behavior ?? (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'),
    })
  }, [])

  useLayoutEffect(() => {
    const projectId = new URLSearchParams(search).get('project')
    const index = projects.findIndex(project => project.id === projectId)
    if (index >= 0) goTo(index, 'instant')
  }, [search, key, goTo])

  function updateActive() {
    const element = track.current
    if (!element) return
    let closest = 0
    let distance = Infinity
    Array.from(element.children).forEach((child, index) => {
      const delta = Math.abs((child as HTMLElement).offsetLeft - element.scrollLeft)
      if (delta < distance) { closest = index; distance = delta }
    })
    setActive(closest)
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return
    const destinations: Record<string, number> = {
      ArrowLeft: Math.max(0, active - 1),
      ArrowRight: Math.min(projects.length - 1, active + 1),
      Home: 0,
      End: projects.length - 1,
    }
    if (event.key in destinations) {
      event.preventDefault()
      goTo(destinations[event.key])
    }
  }

  return <div className="projects-carousel" role="region" aria-roledescription={t('carousel')} aria-label={t('selectedProjects')}>
    <div className="carousel-toolbar">
      <p id="carousel-help" className="mono">{t('swipe')}</p>
      <div className="carousel-controls">
        <span className="mono carousel-count" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        <button className="icon-button" aria-label={t('prevProject')} disabled={active === 0} onClick={() => goTo(active - 1)}><ArrowLeft /></button>
        <button className="icon-button" aria-label={t('nextProject')} disabled={active === projects.length - 1} onClick={() => goTo(active + 1)}><ArrowRight /></button>
      </div>
    </div>
    <div className="project-track" ref={track} onScroll={updateActive} onKeyDown={handleKeys} tabIndex={0} aria-describedby="carousel-help">
      {projects.map((project, index) => <article className={`panel project-card ${active === index ? 'is-active' : ''}`} key={project.id} role="group" aria-roledescription={t('slide')} aria-label={t('projectSlide', { index: index + 1, count: projects.length, name: project.name })}>
        <ProjectGallery key={active === index ? 'active' : 'inactive'} projectId={project.id} name={project.name} active={active === index} />
        <div className="project-copy">
          <span className="eyebrow">{t(`project.${project.id}.category`)}</span>
          <h3>{project.name}</h3>
          <div className="project-status mono">{t(`status.${project.status}`)}{project.period && <> · {project.period}</>}</div>
          <p>{t(`project.${project.id}.description`)}</p>
          <div className="tags" aria-label={t('technologies')}>{project.technologies.map(technology => <span key={technology}>{t(`technology.${technology}`, { defaultValue: technology })}</span>)}</div>
          {(project.githubUrl || project.externalLink) && <div className="button-row">
            {project.githubUrl && <a className="button secondary" href={project.githubUrl} target="_blank" rel="noreferrer"><GitFork size={17} />{t('repo')}</a>}
            {project.externalLink && <a className="button primary" href={project.externalLink.url} target="_blank" rel="noreferrer"><ExternalLink size={17} />{t(project.externalLink.labelKey)}</a>}
          </div>}
          {project.noteKey && <small className="project-link-note">{t(project.noteKey)}</small>}
        </div>
      </article>)}
    </div>
    <div className="slide-indicators" aria-label={t('chooseProject')}>
      {projects.map((project, index) => <button key={project.id} aria-label={t('showProject', { index: index + 1, name: project.name })} aria-current={active === index ? 'true' : undefined} onClick={() => goTo(index)}><span /></button>)}
    </div>
  </div>
}

