interface GalleryPresentation {
  frame: 'website' | 'panorama' | 'document' | 'logo' | 'mobile'
  objectPosition?: string
  showcases?: readonly (readonly string[])[]
}

export const galleryPresentations: Partial<Record<string, GalleryPresentation>> = {
  'around-us': { frame: 'document' },
  'kgc-erp': { frame: 'logo' },
  gymfinder: { frame: 'panorama' },
  gutterkel: { frame: 'website', objectPosition: 'center top' },
  xvr: { frame: 'website' },
  'new-pig': { frame: 'website' },
  liftia: {
    frame: 'mobile',
    showcases: [
      ['preview-01.svg', 'preview-04.svg', 'preview-05.svg'],
      ['preview-02.svg', 'preview-03.svg'],
    ],
  },
}
