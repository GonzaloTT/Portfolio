import type { Project } from '../types/project'

// Preview paths are reserved; set imageAvailable once the corresponding file exists.
// No repository, deployment, or project status is assumed from a design reference.
export const projects: readonly Project[] = [
  {
    id: 'liftia', name: 'LiftIA',
    description: 'A closer look at LiftIA is coming soon. Project scope and technical details are awaiting confirmation.',
    technologies: ['Stack pending'], detailsPending: true,
    imagePath: '/images/projects/liftia.webp', imageAvailable: false,
  },
  {
    id: 'gymfinder', name: 'GymFinder',
    description: 'GymFinder is part of this selected portfolio. A verified project overview will be added with its preview.',
    technologies: ['Stack pending'], detailsPending: true,
    imagePath: '/images/projects/gymfinder.webp', imageAvailable: false,
  },
  {
    id: 'around-the-us', name: 'Around the U.S.',
    description: 'A selected development project. The implementation summary and technology stack will be published after review.',
    technologies: ['Stack pending'], detailsPending: true,
    imagePath: '/images/projects/around-the-us.webp', imageAvailable: false,
  },
  {
    id: 'kgc', name: 'KGC ERP / Pricing SPA',
    description: 'Internal software and business workflow digitalization at King Global Cargo, with ERPNext, Frappe, and Vue / TypeScript interfaces.',
    technologies: ['Vue', 'TypeScript', 'ERPNext', 'Frappe'], detailsPending: false,
    imagePath: '/images/projects/kgc.webp', imageAvailable: false,
  },
  {
    id: 'gutterkel', name: 'Gutterkel',
    description: 'A portfolio entry for Gutterkel. Project responsibilities, technical scope, and preview are awaiting confirmation.',
    technologies: ['Stack pending'], detailsPending: true,
    imagePath: '/images/projects/gutterkel.webp', imageAvailable: false,
  },
  {
    id: 'xvr', name: 'XVR',
    description: 'XVR project details are being prepared for this portfolio. The overview will reflect its confirmed scope.',
    technologies: ['Stack pending'], detailsPending: true,
    imagePath: '/images/projects/xvr.webp', imageAvailable: false,
  },
  {
    id: 'new-pig-mexico', name: 'New Pig México',
    description: 'A selected portfolio entry. The project overview and technology details will be added once confirmed.',
    technologies: ['Stack pending'], detailsPending: true,
    imagePath: '/images/projects/new-pig-mexico.webp', imageAvailable: false,
  },
]

