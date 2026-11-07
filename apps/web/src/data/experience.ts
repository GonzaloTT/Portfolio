interface Experience {
  id: string
  company: string
  role: string
  summary: string
  areas: readonly { title: string; description: string }[]
  technologies: readonly string[]
  clientProjects?: readonly { projectId: string; description: string }[]
}

export const experiences: readonly Experience[] = [
  {
    id: 'kgc',
    company: 'King Global Cargo (KGC)',
    role: 'IT & Software Development Intern',
    summary: 'Development of internal software tools, enterprise interfaces, and digital solutions supporting logistics operations.',
    areas: [
      {
        title: 'ERP Development',
        description: 'ERPNext customization, Frappe Framework, pricing workflows, and business process digitalization.',
      },
      {
        title: 'Software Development',
        description: 'Internal web applications, modern frontend interfaces, and operational tools.',
      },
      {
        title: 'IT Operations',
        description: 'Technical support, Microsoft 365 administration, systems assistance, and technical documentation.',
      },
    ],
    technologies: ['ERPNext', 'Frappe Framework', 'Python', 'Vue', 'TypeScript', 'Microsoft 365'],
  },
  {
    id: 'impulsa',
    company: 'Impulsa+',
    role: 'Software Developer — Web & Mobile Solutions',
    summary: 'Development of websites and digital applications for business clients, combining frontend engineering, UX/UI design and platform integration.',
    areas: [
      {
        title: 'Web Development',
        description: 'Development of responsive corporate websites and user-focused web experiences using React, JavaScript, and modern frontend tools.',
      },
      {
        title: 'UX/UI & Digital Solutions',
        description: 'Implementation of user interfaces, visual design decisions, navigation improvements, and reusable frontend components.',
      },
      {
        title: 'Platform Integration',
        description: 'Development and integration of client-facing websites with Shopify and Odoo, alongside mobile application project work.',
      },
    ],
    technologies: ['React', 'JavaScript', 'Vite', 'CSS', 'React Router', 'Shopify', 'Odoo', 'Figma'],
    clientProjects: [
      { projectId: 'gutterkel', description: 'Corporate website redesign and responsive development.' },
      { projectId: 'xvr', description: 'Industrial laser technology website redesign and Odoo integration.' },
      { projectId: 'new-pig', description: 'Shopify-based e-commerce redesign and frontend customization.' },
    ],
  },
]
