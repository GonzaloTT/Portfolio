import { Camera, Image } from 'lucide-react'

// No request is made to a reserved image path until its asset is available.
export function ImagePlaceholder({ src, available = false, kind = 'project', name }: {
  src: string; available?: boolean; kind?: 'portrait' | 'project'; name: string
}) {
  return <div className={`image-placeholder ${kind}`}>
    {available ? <img src={src} alt={name} /> : <>
      <span className="placeholder-corner mono">{kind === 'portrait' ? 'PORTRAIT / 01' : 'PROJECT PREVIEW'}</span>
      <div className="placeholder-center">
        <span className="placeholder-icon">{kind === 'portrait' ? <Camera size={24} /> : <Image size={24} />}</span>
        <strong>{kind === 'portrait' ? 'Professional photograph' : name}</strong>
        <span className="mono">IMAGE PLACEHOLDER</span>
        <p>{kind === 'portrait' ? 'A little more personal. Coming soon.' : 'Project screenshot to be added.'}</p>
      </div>
      <span className="placeholder-bottom mono">VISUAL ASSET PENDING</span>
    </>}
  </div>
}

