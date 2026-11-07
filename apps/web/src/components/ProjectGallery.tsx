import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { galleryPresentations } from '../data/galleryPresentation'

const motionPreference = '(prefers-reduced-motion: reduce)'
const rotationDelay = 3500
const galleries: Record<string, readonly string[]> = __PROJECT_GALLERIES__

interface GalleryProps {
  projectId: string
  name: string
  active: boolean
}

export function ProjectGallery({ projectId, name, active }: GalleryProps) {
  const { t } = useTranslation()
  const viewport = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia(motionPreference).matches)
  const [paused, setPaused] = useState(false)
  const [selected, setSelected] = useState(0)
  const [failed, setFailed] = useState<readonly string[]>([])

  const presentation = galleryPresentations[projectId]
  const files = (galleries[projectId] ?? []).filter(file => !failed.includes(file))
  const showcases = presentation?.showcases?.map(group => group.filter(file => files.includes(file)))
  const slides = files.flatMap(file => {
    const showcase = showcases?.find(group => group.includes(file))
    if (!showcase) return [[file]]
    return showcase[0] === file ? [showcase] : []
  })
  const count = slides.length
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

  return <div className="project-gallery" role="group" aria-label={t('gallery', { name })}>
    <div className={`gallery-viewport gallery-viewport--${presentation?.frame ?? 'standard'}`} ref={viewport}>
      {count ? slides.map((slide, index) => (active || index === current) && <div
        key={slide.join(',')}
        className={`gallery-slide${slide.length > 1 ? ' gallery-slide--showcase' : ''}${index === current ? ' is-current' : ''}`}
        aria-hidden={index !== current}
      >
        {slide.map(file => <img
          key={file}
          src={`${import.meta.env.BASE_URL}images/projects/${projectId}/${file}`}
          alt={file === 'cover.svg' ? t('cover', { name }) : t('preview', { name, index: Number(file.slice(8, -4)) })}
          style={presentation?.objectPosition ? { objectPosition: presentation.objectPosition } : undefined}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(previous => previous.includes(file) ? previous : [...previous, file])}
        />)}
      </div>) : <p className="gallery-unavailable">{t('unavailablePreview', { name })}</p>}
    </div>
    {active && count > 1 && <div className="gallery-controls">
      <button type="button" className="icon-button" aria-label={t('prevImage', { name })} onClick={() => setSelected((current + count - 1) % count)}><ChevronLeft /></button>
      <span className="mono gallery-count" aria-label={t('gallerySlide', { index: current + 1, count })}>{current + 1} / {count}</span>
      <button type="button" className="icon-button" aria-label={t('nextImage', { name })} onClick={() => setSelected((current + 1) % count)}><ChevronRight /></button>
      {!reducedMotion && <button type="button" className="icon-button" aria-label={t(paused ? 'resumeRotation' : 'pauseRotation', { name })} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</button>}
    </div>}
  </div>
}
