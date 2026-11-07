import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

const motionPreference = '(prefers-reduced-motion: reduce)'
const rotationDelay = 3500
const galleries: Record<string, readonly string[]> = __PROJECT_GALLERIES__

interface GalleryProps {
  projectId: string
  name: string
  active: boolean
}

export function ProjectGallery({ projectId, name, active }: GalleryProps) {
  const viewport = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia(motionPreference).matches)
  const [paused, setPaused] = useState(false)
  const [selected, setSelected] = useState(0)
  const [failed, setFailed] = useState<readonly string[]>([])

  const images = (galleries[projectId] ?? [])
    .filter(file => !failed.includes(file))
  const count = images.length
  const current = count ? selected % count : 0

  useEffect(() => {
    if (!active || count < 2 || !viewport.current) return
    const media = window.matchMedia(motionPreference)
    const syncMotion = () => setReducedMotion(media.matches)
    const syncVisibility = () => setPageVisible(!document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.25)
    }, { threshold: 0.25 })

    syncMotion()
    syncVisibility()
    media.addEventListener('change', syncMotion)
    document.addEventListener('visibilitychange', syncVisibility)
    observer.observe(viewport.current)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncVisibility)
      media.removeEventListener('change', syncMotion)
    }
  }, [active, count])

  const rotating = active && visible && pageVisible && !reducedMotion && !paused && count > 1

  useEffect(() => {
    if (!rotating) return
    const timer = window.setTimeout(() => setSelected((current + 1) % count), rotationDelay)
    return () => window.clearTimeout(timer)
  }, [rotating, current, count])

  return <div className="project-gallery" role="group" aria-label={`${name} image gallery`}>
    <div className="gallery-viewport" ref={viewport}>
      {count ? images.map((file, index) => (active || index === current) && <img
        key={file}
        className={index === current ? 'is-current' : undefined}
        aria-hidden={index !== current}
        src={`${import.meta.env.BASE_URL}images/projects/${projectId}/${file}`}
        alt={file === 'cover.svg' ? `${name} project cover` : `${name} project preview ${Number(file.slice(8, -4))}`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(previous => previous.includes(file) ? previous : [...previous, file])}
      />) : <p className="gallery-unavailable">{name} preview unavailable</p>}
    </div>
    {active && count > 1 && <div className="gallery-controls">
      <button type="button" className="icon-button" aria-label={`Previous ${name} image`} onClick={() => setSelected((current + count - 1) % count)}><ChevronLeft /></button>
      <span className="mono gallery-count" aria-label={`Image ${current + 1} of ${count}`}>{current + 1} / {count}</span>
      <button type="button" className="icon-button" aria-label={`Next ${name} image`} onClick={() => setSelected((current + 1) % count)}><ChevronRight /></button>
      {!reducedMotion && <button type="button" className="icon-button" aria-label={`${paused ? 'Resume' : 'Pause'} ${name} image rotation`} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</button>}
    </div>}
  </div>
}
