import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react'
import { projects } from '../data/projects'
import { ImagePlaceholder } from './ImagePlaceholder'
import '../styles/projects.css'

export function ProjectsCarousel() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  function goTo(index: number) {
    const element = track.current?.children[index] as HTMLElement | undefined
    if (!element || !track.current) return
    track.current.scrollTo({
      left: element.offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

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

  return <div className="projects-carousel" role="region" aria-roledescription="carousel" aria-label="Selected projects">
    <div className="carousel-toolbar">
      <p id="carousel-help" className="mono">Swipe or use the arrow keys to explore</p>
      <div className="carousel-controls">
        <span className="mono carousel-count" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        <button className="icon-button" aria-label="Previous project" disabled={active === 0} onClick={() => goTo(active - 1)}><ArrowLeft /></button>
        <button className="icon-button" aria-label="Next project" disabled={active === projects.length - 1} onClick={() => goTo(active + 1)}><ArrowRight /></button>
      </div>
    </div>
    <div className="project-track" ref={track} onScroll={updateActive} onKeyDown={handleKeys} tabIndex={0} aria-describedby="carousel-help">
      {projects.map((project, index) => <article className={`panel project-card ${active === index ? 'is-active' : ''}`} key={project.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.name}`}>
        <ImagePlaceholder name={project.name} src={project.imagePath} available={project.imageAvailable} />
        <div className="project-copy">
          <span className="eyebrow">{project.detailsPending ? 'Details pending' : 'Internal software / Business workflows'}</span>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="tags" aria-label="Technologies">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div>
          {(project.githubUrl || project.liveUrl) && <div className="button-row">
            {project.githubUrl && <a className="button secondary" href={project.githubUrl} target="_blank" rel="noreferrer"><Github size={17} />GitHub Repository</a>}
            {project.liveUrl && <a className="button primary" href={project.liveUrl} target="_blank" rel="noreferrer"><ExternalLink size={17} />View Live Project</a>}
          </div>}
          {!project.githubUrl && !project.liveUrl && <span className="project-link-note mono">Project links awaiting confirmation</span>}
        </div>
      </article>)}
    </div>
    <div className="slide-indicators" aria-label="Choose a project">
      {projects.map((project, index) => <button key={project.id} aria-label={`Show project ${index + 1}: ${project.name}`} aria-current={active === index ? 'true' : undefined} onClick={() => goTo(index)}><span /></button>)}
    </div>
  </div>
}

