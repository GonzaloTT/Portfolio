import { useTranslation } from 'react-i18next'
import { Camera, Image } from 'lucide-react'

// No request is made to a reserved image path until its asset is available.
export function ImagePlaceholder({ src, available = false, kind = 'project', name }: {
  src: string; available?: boolean; kind?: 'portrait' | 'project'; name: string
}) {
  const { t } = useTranslation()
  return <div className={`image-placeholder ${kind}`}>
    {available ? <img src={src} alt={name} /> : <>
      <span className="placeholder-corner mono">{kind === 'portrait' ? t('portraitTag') : t('previewTag')}</span>
      <div className="placeholder-center">
        <span className="placeholder-icon">{kind === 'portrait' ? <Camera size={24} /> : <Image size={24} />}</span>
        <strong>{kind === 'portrait' ? t('portraitTitle') : name}</strong>
        <span className="mono">{t('imagePlaceholder')}</span>
        <p>{kind === 'portrait' ? t('portraitPending') : t('previewPending')}</p>
      </div>
      <span className="placeholder-bottom mono">{t('assetPending')}</span>
    </>}
  </div>
}

