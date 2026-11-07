interface Experience {
  id: string
  company: string
  areas: readonly string[]
  technologies: readonly string[]
  clientProjects?: readonly string[]
}

export const experiences: readonly Experience[] = [
  {
    id: 'kgc',
    company: 'King Global Cargo (KGC)',
    areas: [
      'erp',
      'software',
      'it',
    ],
    technologies: ['ERPNext', 'Frappe Framework', 'Python', 'Vue', 'TypeScript', 'Microsoft 365'],
  },
  {
    id: 'impulsa',
    company: 'Impulsa+',
    areas: [
      'web',
      'design',
      'integration',
    ],
    technologies: ['React', 'JavaScript', 'Vite', 'CSS', 'React Router', 'Shopify', 'Odoo', 'Figma'],
    clientProjects: [
      'gutterkel',
      'xvr',
      'new-pig',
    ],
  },
]
